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

export async function uploadToAppStore(
  apiKey: string,
  apiIssuer: string
): Promise<void> {
  await exec.exec("xcrun", [
    "altool",
    "--upload-app",
    "--type",
    "ios",
    "-f",
    "build/ios/ipa/*.ipa",
    "--apiKey",
    apiKey,
    "--apiIssuer",
    apiIssuer
  ]);
}
