import { Command } from "commander";
import { login } from "../utils/auth";

const loginCommand = new Command("login")
  .description("Login with name and email")
  .requiredOption("--name <name>", "Your name")
  .requiredOption("--email <email>", "Your email")
  .action((options) => {
    login(options.name, options.email);
  });

export default loginCommand;
