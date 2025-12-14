import { Request, Response } from 'express';
export declare const getAllUsers: (req: any, res: Response) => Promise<void>;
export declare const updateUserStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const promoteToAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const demoteToUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStatistics: (req: Request, res: Response) => Promise<void>;
export declare const getDetailedStatistics: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=adminController.d.ts.map