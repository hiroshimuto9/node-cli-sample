import { Command } from "commander";
import { checkAuth, logout } from "../utils/api"; // utils/auth ではなく utils/api から読み込む
import * as fs from "fs";
import * as path from "path";

const buildCommand = new Command("build")
  .description("Build the project")
  .action(async () => {
    try {
      await checkAuth();
      console.log("Building the project...");

      const projectRoot = process.cwd();
      console.log(`Project root: ${projectRoot}`);

      const outputDir = path.join(projectRoot, "output");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
        console.log(`Created output directory at ${outputDir}`);
      }

      const publicDir = path.join(projectRoot, "public");
      const htmlFiles = getFiles(publicDir, ".html");
      const cssFiles = getFiles(publicDir, ".css");

      console.log(`Found HTML files: ${htmlFiles}`);
      console.log(`Found CSS files: ${cssFiles}`);

      htmlFiles.forEach((file) => convertToLiquid(file, outputDir));
      cssFiles.forEach((file) => convertToLiquid(file, outputDir));

      console.log("Build completed.");
    } catch (error: any) {
      console.error("Error during build:", error.message || error);
    }

    process.on("SIGINT", async () => {
      process.exit();
    });

    process.on("SIGTERM", async () => {
      process.exit();
    });
  });

function getFiles(dir: string, ext: string): string[] {
  let files: string[] = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getFiles(fullPath, ext));
    } else if (stat.isFile() && fullPath.endsWith(ext)) {
      files.push(fullPath);
    }
  });

  return files;
}

function convertToLiquid(filePath: string, outputDir: string): void {
  try {
    const fileName = path.basename(filePath, path.extname(filePath));
    const liquidFilePath = path.join(outputDir, `${fileName}.liquid`);
    let content = fs.readFileSync(filePath, "utf-8");

    // 詳細な変換ロジックを追加
    content = content.replace(/<html>/g, '{% layout "default" %}');
    content = content.replace(/<\/html>/g, "");
    content = content.replace(/<head>/g, "{% block head %}");
    content = content.replace(/<\/head>/g, "{% endblock %}");
    content = content.replace(/<body>/g, "{% block body %}");
    content = content.replace(/<\/body>/g, "{% endblock %}");

    fs.writeFileSync(liquidFilePath, content);
    console.log(`Converted ${filePath} to ${liquidFilePath}`);
  } catch (error: any) {
    console.error(
      `Error converting ${filePath} to liquid:`,
      error.message || error
    );
  }
}

export default buildCommand;
