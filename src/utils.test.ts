import {test, expect, afterEach} from "vitest";
import * as path from "path";
import * as fs from "fs";
import {getFlutterPath, isFlutterInstalled} from "./utils";

afterEach(() => {
  fs.rmSync(path.join(process.env.HOME, "flutter.zip"), {
    force: true
  });
  fs.rmSync(path.join(process.env.HOME, "flutter"), {
    recursive: true,
    force: true
  });
});

test("check if flutter is installed", async () => {
  expect(await isFlutterInstalled()).toBeTypeOf("boolean");
});
