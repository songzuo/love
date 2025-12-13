import { Response } from 'express';
export declare const sendMessage: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMessages: (req: any, res: Response) => Promise<void>;
export declare const getConversation: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAsRead: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMessage: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=messageController.d.ts.map