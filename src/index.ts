import { Command } from "commander";
import loginCommand from "./commands/login";
import devCommand from "./commands/dev";
import buildCommand from "./commands/build";
import { logout, shouldLogout } from "./utils/auth";

const program = new Command();

program
  .version("1.0.0")
  .description("My CLI Tool")
  .addCommand(loginCommand)
  .addCommand(devCommand)
  .addCommand(buildCommand);

program.parse(process.argv);

const command = program.args[0] || "";

const isLogoutSkipCommand = command === "login" || "dev" || "build";
const isLogoutRequired = !isLogoutSkipCommand && shouldLogout();

const handleExit = () => {
  if (isLogoutRequired) {
    logout();
  }
  process.exit();
};

// 通常のプロセス終了時にログアウト処理を行う
process.on("exit", handleExit);

// Ctrl+Cでプロセスが終了されたシグナルを受信した場合にログアウト処理を行う
process.on("SIGINT", handleExit);

// システム管理者やプログラムがプロセスを終了させたいときに使用される。
// kill コマンドやシステムシャットダウン時などに送信される。
// Windowsではサポートされていない。
// https://nodejs.org/api/process.html
process.on("SIGTERM", handleExit);
