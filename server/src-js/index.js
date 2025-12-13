"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.User = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importStar(require("./utils/db"));
const models_1 = require("./models");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const admin_1 = __importDefault(require("./routes/admin"));
const messages_1 = __importDefault(require("./routes/messages"));
const publicAdmin_1 = __importDefault(require("./routes/publicAdmin"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dbInit_1 = __importDefault(require("./utils/dbInit"));
// Load environment variables
dotenv_1.default.config();
// Log environment info
console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
// Initialize express app
const app = (0, express_1.default)();
// Connect to database and initialize models
console.log('Connecting to database...');
(0, db_1.default)()
    .then(async () => {
    console.log('Database connected successfully');
    // Initialize models and relationships AFTER database connection
    const { User, Message } = (0, models_1.createModels)(db_1.sequelize);
    // Make models globally available
    global.User = User;
    global.Message = Message;
    // Initialize database with admin users AFTER models are created
    await (0, dbInit_1.default)();
    // Now that database is ready, set up the rest of the app
    setupApp();
})
    .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});
const setupApp = () => {
    // Middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // API Routes - Always place API routes before static file serving
    app.use('/api/auth', auth_1.default);
    app.use('/api/users', users_1.default);
    app.use('/api/admin', admin_1.default);
    app.use('/api/messages', messages_1.default);
    app.use('/api/public-admin', publicAdmin_1.default);
    // Health check route
    app.get('/api/health', (req, res) => {
        res.status(200).json({ status: 'ok', message: 'Dating App API is running' });
    });
    // Serve static files and handle SPA routing
    if (process.env.NODE_ENV === 'production') {
        const staticPath = path_1.default.join(__dirname, '../../client/dist');
        console.log('Static files path:', staticPath);
        // Check if the directory exists
        if (fs_1.default.existsSync(staticPath)) {
            console.log('Static directory exists');
            console.log('Files in static directory:', fs_1.default.readdirSync(staticPath));
        }
        else {
            console.error('Static directory does not exist:', staticPath);
        }
        // Serve static files with proper MIME types
        app.use(express_1.default.static(staticPath, {
            setHeaders: (res, filePath) => {
                // Set correct MIME types for JavaScript and WASM files
                if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
                    res.setHeader('Content-Type', 'application/javascript');
                }
                else if (filePath.endsWith('.wasm')) {
                    res.setHeader('Content-Type', 'application/wasm');
                }
            }
        }));
        // Serve index.html for all non-API routes (for SPA)
        // 注意：这个路由必须放在所有API路由之后
        app.get(/^\/(?!api\/).*/, (req, res) => {
            const indexPath = path_1.default.join(__dirname, '../../client/dist/index.html');
            console.log('Serving index.html for route:', req.url);
            // Check if file exists before sending
            if (fs_1.default.existsSync(indexPath)) {
                res.sendFile(indexPath);
            }
            else {
                console.error('Index file not found:', indexPath);
                res.status(404).json({ message: 'Frontend build not found' });
            }
        });
    }
    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err);
        console.error('Error stack:', err.stack);
        // In development, provide more detailed error information
        if (process.env.NODE_ENV === 'development') {
            res.status(500).json({
                message: 'Something went wrong!',
                error: err.message,
                stack: err.stack
            });
        }
        else {
            // In production, provide generic error message
            res.status(500).json({ message: 'Something went wrong!' });
        }
    });
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
// Export models for use in other files
// We'll export them from the global scope since they're initialized asynchronously
const User = () => global.User;
exports.User = User;
const Message = () => global.Message;
exports.Message = Message;
//# sourceMappingURL=index.js.map