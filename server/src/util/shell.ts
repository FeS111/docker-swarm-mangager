import { exec as execute } from "child_process";

export function exec(command: string): Promise<string>{
   return new Promise((resolve, reject) => {
    execute(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
     });
   })
};
