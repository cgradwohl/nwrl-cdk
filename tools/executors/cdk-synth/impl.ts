import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface CDKSynthExecutorOptions {
  filePath: string;
}

export default async function CDKSynthExecutor(
  options: CDKSynthExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const command = `npx cdk synth --app "${options.filePath}"`;
  console.info(`Executing ${command}`);

  const { stdout, stderr } = await promisify(exec)(command);

  console.log(stdout);
  console.error(stderr);

  const success = !!stderr;
  return { success };
}
