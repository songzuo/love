import { Request, Response } from 'express';
export declare const getAllUsers: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const promoteToAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const demoteToUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=publicAdminController.d.ts.map