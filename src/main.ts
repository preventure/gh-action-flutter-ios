import * as os from "os";
import * as core from "@actions/core";
import {isFlutterInstalled, runFlutterBuild} from "./utils";

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

    core.info(`RUN: flutter build ${buildType} ${buildArgs}`);

    await runFlutterBuild(buildType, buildArgs);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
