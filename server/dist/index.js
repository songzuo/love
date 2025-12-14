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
const matches_1 = __importDefault(require("./routes/matches"));
const favorites_1 = __importDefault(require("./routes/favorites"));
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
    const { User, Message, Favorite } = (0, models_1.createModels)(db_1.sequelize);
    // Make models and sequelize globally available
    global.sequelize = db_1.sequelize;
    global.User = User;
    global.Message = Message;
    global.Favorite = Favorite;
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
    app.use('/api/matches', matches_1.default);
    app.use('/api/favorites', favorites_1.default);
    // Health check route
    app.get('/api/health', (req, res) => {
        res.status(200).json({ status: 'ok', message: 'Dating App API is running' });
    });
    // Serve static files and handle SPA routing
    // Always serve static files regardless of NODE_ENV for testing
    // In production, this will serve the built client
    // In development, this will serve the client build if it exists
    // Log current working directory and __dirname for debugging
    console.log('Current working directory:', process.cwd());
    console.log('__dirname:', __dirname);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    // Try multiple possible static paths
    const possibleStaticPaths = [
        // Default path based on __dirname
        path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? '../../../client/dist' : '../../client/dist'),
        // Alternative path based on cwd
        path_1.default.join(process.cwd(), 'client/dist'),
        // Render specific path
        path_1.default.join(process.cwd(), '../../client/dist'),
        // Another Render specific path (assuming src directory structure)
        path_1.default.join(process.cwd(), '../client/dist'),
        // Absolute path for Render
        '/opt/render/project/src/client/dist'
    ];
    let staticPath = '';
    let foundStaticPath = false;
    for (const possiblePath of possibleStaticPaths) {
        console.log('Checking static path:', possiblePath);
        if (fs_1.default.existsSync(possiblePath)) {
            console.log('✓ Found static directory:', possiblePath);
            try {
                const files = fs_1.default.readdirSync(possiblePath);
                console.log('Files in static directory:', files);
                staticPath = possiblePath;
                foundStaticPath = true;
                break;
            }
            catch (readError) {
                console.error('Error reading directory:', readError);
            }
        }
        else {
            console.log('✗ Static directory does not exist:', possiblePath);
        }
    }
    // If no static path found, log more debug info
    if (!foundStaticPath) {
        console.error('❌ No static directory found in any of the possible paths');
        // Log directory structure for debugging
        try {
            console.log('Directory structure from cwd:', fs_1.default.readdirSync(process.cwd()));
            if (fs_1.default.existsSync(path_1.default.join(process.cwd(), '..'))) {
                console.log('Directory structure from parent:', fs_1.default.readdirSync(path_1.default.join(process.cwd(), '..')));
            }
        }
        catch (dirError) {
            console.error('Error reading directory structure:', dirError);
        }
    }
    // Only serve static files if we found a valid static path
    if (foundStaticPath && staticPath) {
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
            const indexPath = path_1.default.join(staticPath, 'index.html');
            console.log('Serving index.html for route:', req.url);
            console.log('Index file path:', indexPath);
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
    else {
        console.warn('⚠️  No valid static path found. Static file serving disabled.');
        // Still provide a fallback for non-API routes
        app.get(/^\/(?!api\/).*/, (req, res) => {
            res.status(404).json({ message: 'Frontend build not found. Server running in API-only mode.' });
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