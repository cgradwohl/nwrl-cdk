import type { ExecutorContext } from '@nrwl/devkit';
import { spawn, spawnSync } from 'child_process';

export interface CDKDeployExecutorOptions {
  filePath: string;
}

export default function CDKDeployExecutor(options: CDKDeployExecutorOptions) {
  return new Promise((resolve) => {
    const command = `npx cdk deploy --app "${options.filePath}"`;

    console.info(`Executing ${command} \n`);

    const child = spawn(command, {
      shell: true,
      stdio: 'inherit',
    });

    /**
     * https://nodejs.org/api/child_process.html#event-exit
     */
    child.on('exit', function (code) {
      if (code === 1) {
        resolve({ success: false });
      }

      resolve({ success: true });
    });
  });
}
