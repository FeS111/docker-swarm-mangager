/// <reference types="node" />
export declare function exec(command: string, stdout: (...args: any[]) => void | NodeJS.WriteStream, stderr: (...args: any[]) => void | NodeJS.WriteStream): Promise<string>;
export declare function spawn(command: string, args: string[], stdout?: NodeJS.WriteStream, stderr?: NodeJS.WriteStream): Promise<void>;
//# sourceMappingURL=index.d.ts.map