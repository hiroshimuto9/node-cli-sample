import * as fs from "fs";
import * as path from "path";

let isLoggedIn = false;
const authFilePath = path.join(__dirname, "../../auth.json");
const loginStatusFilePath = path.join(__dirname, "../../login-status.json");

/**
 * 名前とメールアドレスを元にログイン情報を永続化する
 * @param name 名前
 * @param email メールアドレス
 */
export const login = (name: string, email: string): void => {
  // 正しい名前とメールアドレスを定義
  const validName = "test";
  const validEmail = "test@test.com";

  if (name === validName && email === validEmail) {
    const authData = { name, email };
    fs.writeFileSync(authFilePath, JSON.stringify(authData));
    fs.writeFileSync(loginStatusFilePath, JSON.stringify({ loggedIn: true }));

    const message = `
>>> ログイン情報 <<<
ユーザー名: ${name}
メールアドレス: ${email}
    `;

    console.log(message);
    isLoggedIn = true;
  } else {
    console.error(
      "ログインできませんでした。名前・メールアドレスが正しいかご確認ください。"
    );
    process.exit(1);
  }
};

/**
 * ログイン状態を確認し、未ログインの場合は処理を終了する
 * @returns ログイン状態
 */
export const checkAuth = (): void => {
  if (!isLoggedIn) {
    try {
      const authData = JSON.parse(fs.readFileSync(authFilePath, "utf-8"));
      if (authData && authData.name && authData.email) {
        isLoggedIn = true;
        return;
      }
    } catch (error) {
      console.error("ログインが必要です");
      process.exit(1);
    }
  }
};

/**
 * ログアウト処理
 */
export const logout = (): void => {
  if (fs.existsSync(authFilePath)) {
    fs.unlinkSync(authFilePath);
    console.log("Logged out and removed auth file.");
  }
  if (fs.existsSync(loginStatusFilePath)) {
    fs.unlinkSync(loginStatusFilePath);
  }
  isLoggedIn = false;
};

/**
 * ログアウト処理を実行すべきか判定
 * @returns ログアウト処理の必要有無
 */
export function shouldLogout(): boolean {
  return fs.existsSync(loginStatusFilePath);
}
