import { app, BrowserWindow ,screen , webFrame ,ipcMain} from "electron";
import * as path  from 'path';
console.log(process.env.MODE);
const loadUrl = process.env.MODE === "devlopment" ? "http://127.0.0.1:5173/" : path.join(__dirname, "../src/index.html");
let win: BrowserWindow | null = null;
const mode = 'development'
function createWindow() { 
  win = new BrowserWindow({
    width: 900,
    height: 600,
    title : "WeQ",
    frame : false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), 
      nodeIntegration: true,
    },
  });
  const devInnerHeight = 1080.0 
  const devDevicePixelRatio = 1.0// 开发时的devicepixelratio
  const devScaleFactor = 1.3 // 开发时的ScaleFactor
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor
  
  win.loadURL(loadUrl);
  const zoomFactor = 
  (window.innerHeight / devInnerHeight) * 
  (window.devicePixelRatio / devDevicePixelRatio) * 
  (devScaleFactor / scaleFactor)
  webFrame.setZoomFactor(zoomFactor)

  win.on('closed', () => {
    win = null;
  });

  if (mode === 'development') {
    win.webContents.openDevTools()
  }
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
// 实现自定义标题栏，最小化，最大化，关闭
ipcMain.on("window-min", () => win?.minimize());
ipcMain.on("window-max", () => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});
ipcMain.on("window-close", () => {
  win?.destroy();
});