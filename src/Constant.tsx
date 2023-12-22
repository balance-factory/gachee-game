export const REDIRECT_URI = location.href.includes("localhost")
  ? "http://localhost:3000"
  : "https://gachee-game-main.vercel.app";
