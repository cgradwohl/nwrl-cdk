import { spawn } from 'child_process';
import { CDKDeployExecutorOptions } from './schema';

export default function CDKDeployExecutor(options: CDKDeployExecutorOptions) {
  return new Promise((resolve) => {
    const command = `npx cdk deploy --app "${options.main}" --output "${options.outputPath}"`;

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
