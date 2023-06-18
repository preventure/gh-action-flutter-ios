import * as exec from "@actions/exec";

export async function isFlutterInstalled(): Promise<boolean> {
  try {
    const flutterVersion = await exec.getExecOutput("flutter", ["--version"]);
    return flutterVersion.exitCode === 0;
  } catch {
    return false;
  }
}

export async function runFlutterBuild(
  type: string,
  args: string
): Promise<void> {
  await exec.exec("flutter", ["build", type, ...args.split(" ")]);
}
