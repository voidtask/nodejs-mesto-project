import fs from "fs";
import { Console } from "console";

const output = fs.createWriteStream("./requests.log", { flags: "a" });
const errorOutput = fs.createWriteStream("./error.log", { flags: "a" });

const logger = new Console({ stdout: output, stderr: errorOutput });

function formatLogMessage(level: string, message: string | unknown) {
  const now = new Date().toISOString();

  return `[${now}] - ${level} - ${message}`;
}

function info(maybeMessage: string | unknown) {
  return logger.log(formatLogMessage("INFO", String(maybeMessage)));
}

function error(maybeMessage: string | unknown) {
  return logger.error(formatLogMessage("ERROR", String(maybeMessage)));
}

export default {
  info,
  error,
};
