/// <reference types="node" />
import fs from 'fs';
export declare function readFile(path: string, encoding?: BufferEncoding): Promise<string>;
export declare function readJsonFile<T>(path: string, encoding?: BufferEncoding): Promise<T>;
export declare function readDir(dir: string): Promise<fs.Dirent[]>;
export declare function readJsonDir<T extends object>(dir: string, filenameProperty?: string): Promise<T[]>;
export declare function getSubdirNames(dir: string): Promise<string[]>;
export declare function dotEnv(path: string): Promise<{
    [key: string]: string;
}>;
//# sourceMappingURL=index.d.ts.map