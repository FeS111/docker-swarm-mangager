import fs from 'fs';
import path from 'path';

export async function readFile(path: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, { encoding }, (err, data) => {
            if (err) return reject(err);
            try {
                resolve(data.toString());
            } catch (e) {
                reject(e);
            }
        });
    });
}

export async function readJsonFile<T>(path: string, encoding: BufferEncoding = 'utf-8'): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        try {
            resolve(JSON.parse(
                await readFile(path, encoding)
            ) as T);
        } catch (e) {
            reject(e);
        }
    });
}

export function readDir(dir: string): Promise<fs.Dirent[]> {
    return new Promise<fs.Dirent[]>((resolve, reject) => {
        fs.readdir(dir, { withFileTypes: true }, (err, list) => {
            if (err) return reject(err);
            resolve(list);
        });
    });
}

export function readJsonDir<T extends object>(dir: string, filenameProperty?: string): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        fs.readdir(dir, { withFileTypes: true }, async (err, list) => {
            if (err) return reject(err);
            const arr: T[] = [];
            for (const e of list.filter(e => e.isFile() && e.name.match(/\.json$/))) {
                const json: any = await readJsonFile<T>(path.resolve(dir, e.name));
                if (typeof filenameProperty === 'string') {
                    json[filenameProperty] = e.name;
                }
                arr.push(json);
            }

            resolve(arr);
        });
    });
}

export function getSubdirNames(dir: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(dir, { withFileTypes: true }, async (err, list) => {
            if (err) return reject(err);
            resolve(list.filter(e => e.isDirectory()).map(e => e.name));
        });
    });
}

export function dotEnv(path: string): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buf) => {
            if (err) return reject(err);
            try {
                resolve(
                    buf.toString()
                        .split(/\r?\n/)
                        .filter((v) => v.trim().length !== 0)
                        .reduce((result, current) => {
                            const match = current.match(/^(export\s+)?([^=]+)=(.*)$/);
                            if (match) result[match[2]] = match[3];
                            return result;
                        }, {} as { [key: string]: string })
                );
            } catch (e) {
                reject(e);
            }
        });
    });
}
