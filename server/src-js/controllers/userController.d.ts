import { Request, Response } from 'express';
export declare const getCurrentUser: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUserProfile: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: any, res: Response) => Promise<void>;
export declare const updateUserStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=userController.d.ts.map