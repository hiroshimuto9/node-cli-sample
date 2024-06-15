import { Command } from "commander";
import { checkAuth } from "../utils/auth";
import express from "express";
import * as path from "path";

const devCommand = new Command("dev")
  .description("Start the development server")
  .action(() => {
    checkAuth();
    console.log("Starting development server...");

    const app = express();
    const port = 3000;

    // 静的ファイルを提供するためのディレクトリを設定
    const staticDir = path.join(process.cwd(), "public");
    app.use(express.static(staticDir));

    app.get("/", (req, res) => {
      res.sendFile(path.join(staticDir, "index.html"));
    });

    app.listen(port, () => {
      console.log(`Development server is running at http://localhost:${port}`);
      console.log(`Serving files from ${staticDir}`);
    });
  });

export default devCommand;
