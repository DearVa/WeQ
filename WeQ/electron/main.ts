import { ChildProcess, exec, spawn } from "child_process";
import { app, BrowserWindow, screen, webFrame, ipcMain } from "electron";
import * as path from "path";

console.log(process.env.MODE);
const loadUrl =
    process.env.MODE === "devlopment"
        ? "http://127.0.0.1:5173/"
        : path.join(__dirname, "../src/index.html");
let win: BrowserWindow | null = null;

const mode = "development";

let miraiProcess: ChildProcess;

console.log("~~~THE ELECTRON PATH IS : " + app.getAppPath() + " ~~~");
console.log("~~~THE ELECTRON EXE IS : " + app.getPath("exe") + " ~~~");
const miraiDir = path.join(path.dirname(app.getAppPath()), "mirai");
const mirai = path.join(miraiDir, "mcl.cmd");
console.log("~~~THE MCL PATH IS : " + mirai + " ~~~");

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        title: "WeQ",
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });
    const devInnerHeight = 1080.0;
    const devDevicePixelRatio = 1.0; // 开发时的devicepixelratio
    const devScaleFactor = 1.3; // 开发时的ScaleFactor
    const scaleFactor = screen.getPrimaryDisplay().scaleFactor;

    win.loadURL(loadUrl);
    const zoomFactor =
        (window.innerHeight / devInnerHeight) *
        (window.devicePixelRatio / devDevicePixelRatio) *
        (devScaleFactor / scaleFactor);
    webFrame.setZoomFactor(zoomFactor);

    win.on("closed", () => {
        win = null;
    });

    if (mode == "development") {
        win.webContents.openDevTools();
    }
}

function createMirai() {
    miraiProcess = spawn("java -jar " + path.join(miraiDir, "mcl.jar"), {
        shell: true,
        cwd: miraiDir
    });
    if (!miraiProcess.stdout || !miraiProcess.stderr) {
        throw new Error("~~~无法打开mirai的标准输出流");
    }
    // 打印正常的后台可执行程序输出
    miraiProcess.stdout.on("data", function (data) {
        console.log("Mirai[Data]: " + data);
    });

    // 打印错误的后台可执行程序输出
    miraiProcess.stderr.on("data", function (data) {
        console.log("Mirai[Error]: " + data);
    });

    // 退出之后的输出
    miraiProcess.on("close", function (code) {
        console.log("Mirai[Exit]: " + code);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 在Electron进程就绪的时候启动Mirai
app.on("ready", function () {
    createMirai();
});

// 退出前关闭Mirai进程
app.on("will-quit", () => {
    console.log("~~~WILL KILL MIRAI WITH PROCESS ID : " + miraiProcess.pid);
    exec('taskkill /pid ' + miraiProcess.pid + ' /T /F');
    miraiProcess?.emit("close")
});

app.on("window-all-closed", () => {
    app.quit();
    // if (process.platform !== "darwin") {
    //     app.quit();
    // }
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
