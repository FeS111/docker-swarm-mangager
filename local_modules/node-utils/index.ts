import { exec, spawn } from './shell';
import { readFile, readJsonFile, readDir, readJsonDir, getSubdirNames, dotEnv } from './file';

export declare namespace NodeUtils {
    type Shell = {
        exec: typeof exec;
        spawn: typeof spawn;
    }

    type FileSystem = {
        readFile: typeof readFile;
        readJsonFile: typeof readJsonFile;
        readDir: typeof readDir;
        readJsonDir: typeof readJsonDir;
        getSubdirNames: typeof getSubdirNames;
        dotEnv: typeof dotEnv;
    }
}
