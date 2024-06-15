import { Command } from "commander";
import loginCommand from "./commands/login";
import devCommand from "./commands/dev";
import buildCommand from "./commands/build";
// import { logout, shouldLogout } from "./utils/auth";
import { logout, shouldLogout } from "./utils/api";

const program = new Command();

program
  .version("1.0.0")
  .description("My CLI Tool")
  .addCommand(loginCommand)
  .addCommand(devCommand)
  .addCommand(buildCommand);

program.parse(process.argv);

const command = program.args[0] || "";
const isLogoutSkipCommand = command === "login" || command === "build";

const handleExit = async () => {
  if (!isLogoutSkipCommand) {
    await logout();
  }
  process.exit();
};

// 通常のプロセス終了時にログアウト処理を行う
process.on("exit", handleExit);

// Ctrl+Cでプロセスが終了されたシグナルを受信した場合にログアウト処理を行う
process.on("SIGINT", async () => {
  await handleExit();
  process.exit();
});

// システム管理者やプログラムがプロセスを終了させたいときに使用される。
// kill コマンドやシステムシャットダウン時などに送信される。
// Windowsではサポートされていない。
// https://nodejs.org/api/process.html
process.on("SIGTERM", async () => {
  await handleExit();
  process.exit();
});
