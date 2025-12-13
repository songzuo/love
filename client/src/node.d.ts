// Type declarations for Node.js globals
declare var process: {
  env: {
    [key: string]: string | undefined;
  };
  cwd(): string;
  exit(code?: number): never;
  argv: string[];
  platform: string;
  version: string;
};

declare var __dirname: string;
declare var __filename: string;

interface NodeRequire {
  (id: string): any;
  resolve(id: string): string;
  cache: any;
  extensions: any;
}

declare var require: NodeRequire;