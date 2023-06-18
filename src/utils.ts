import * as exec from "@actions/exec";

export async function isFlutterInstalled(): Promise<boolean> {
  const flutterVersion = await exec.getExecOutput("flutter", ["--version"]);
  return flutterVersion.exitCode === 0;
}

export async function runFlutterBuild(
  type: string,
  args: string
): Promise<void> {
  await exec.exec("flutter", ["build", type, ...args.split(" ")]);
}
