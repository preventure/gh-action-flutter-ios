import * as os from "os";
import * as core from "@actions/core";
import {isFlutterInstalled, runFlutterBuild, uploadToAppStore} from "./utils";

async function run(): Promise<void> {
  try {
    const platform = os.platform();
    const buildType = "ipa";
    const buildArgs = core.getInput("args");

    if (platform !== "darwin") {
      core.setFailed("iOS builds are only supported on macOS");
      return;
    }

    if (!(await isFlutterInstalled())) {
      core.setFailed("Flutter is not installed");
      return;
    }

    await runFlutterBuild(buildType, buildArgs);
    core.debug("Build successful");

    const apiKey = core.getInput("api-key");
    const apiIssuer = core.getInput("api-issuer");
    await uploadToAppStore(apiKey, apiIssuer);
    core.debug("Upload successful");
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
