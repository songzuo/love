interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}
export declare const generateToken: (payload: JwtPayload) => string;
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map