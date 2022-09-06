import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import { CDKSynthExecutorOptions } from './schema';

export default async function CDKSynthExecutor(
  options: CDKSynthExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const command = `npx cdk synth --app "${options.main}" --output "${options.outputPath}"`;
  console.info(`Executing ${command}`);

  const { stdout, stderr } = await promisify(exec)(command);

  console.log(stdout);
  console.error(stderr);

  const success = !!stderr;
  return { success };
}
