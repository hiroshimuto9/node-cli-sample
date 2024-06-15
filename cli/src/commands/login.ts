import { Command } from "commander";
import { login } from "../utils/api";

const loginCommand = new Command("login")
  .description("Login with your name and email")
  .requiredOption("--name <name>", "Your name")
  .requiredOption("--email <email>", "Your email")
  .action(async (cmd) => {
    const { name, email } = cmd;
    try {
      const response = await login(name, email);
      console.log(response.message);
    } catch (error: any) {
      console.error(error.message);
    }
  });

export default loginCommand;
