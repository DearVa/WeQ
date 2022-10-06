import { app, BrowserWindow } from "electron";
import * as path  from 'path';
console.log(process.env.MODE);
const loadUrl = process.env.MODE === "devlopment" ? "http://127.0.0.1:5173/" : path.join(__dirname, "../src/index.html");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // nodeIntegration: true,
    },
  });
  win.loadURL(loadUrl);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

