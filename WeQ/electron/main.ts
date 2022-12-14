import { ChildProcess, spawn } from "child_process";
import { app, BrowserWindow, screen, webFrame, ipcMain, } from "electron";
import * as path from "path";
import * as Logger from "../framework/logger";
import { Server } from "../framework/server";

Logger.log(process.env.MODE);
const loadUrl =
    process.env.MODE === "devlopment"
        ? "http://127.0.0.1:5173/"
        : path.join(__dirname, "../src/index.html");
let win: BrowserWindow | null = null;

const mode = "development";

let miraiProcess: ChildProcess;
let miraiFinish : Promise<void>;


const usePackadJRE = true;

Logger.log("~~~THE ELECTRON PATH IS : " + app.getAppPath() + " ~~~");
Logger.log("~~~THE ELECTRON EXE IS : " + app.getPath("exe") + " ~~~");
const miraiDir = path.join(path.dirname(app.getAppPath()), "mirai");
const mirai = path.join(miraiDir, "mcl.cmd");
Logger.log("~~~THE MCL PATH IS : " + mirai + " ~~~");

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

    win.on("closed", () => {
        win = null;
    });

    win.loadURL(loadUrl);

    if (win && mode == "development") {
        win.webContents.openDevTools();
    }

    if (window) {
        const zoomFactor =
            (window.innerHeight / devInnerHeight) *
            (window.devicePixelRatio / devDevicePixelRatio) *
            (devScaleFactor / scaleFactor);
        webFrame.setZoomFactor(zoomFactor);
    }
}

function createMirai() {
    let cmdHead = "java"
    if (usePackadJRE) {
        cmdHead = path.join(miraiDir, "jre", "bin", "java.exe");
    }
    miraiProcess = spawn(
        cmdHead + " -jar " + path.join(miraiDir, "mcl.jar"),
        {
            shell: true,
            cwd: miraiDir,
        }
    );
    if (!miraiProcess.stdout || !miraiProcess.stderr) {
        throw new Error("~~~无法打开mirai的标准输出流");
    }

    // 打印正常的后台可执行程序输出
    miraiProcess.stdout.on("data", (data) => {
        Logger.log("Mirai[Data]: " + data);
    });

    // 打印错误的后台可执行程序输出
    miraiProcess.stderr.on("data", (data) => {
        Logger.log("Mirai[Error]: " + data);
    });

    // 退出之后的输出
    miraiProcess.on("close", (code) => {
        Logger.log("Mirai[Exit]: " + code);
    });

    miraiFinish = new Promise((res,rej)=>{
        miraiProcess?.stdout?.on("data", (data) => {
            const str = new String(data);
            if(str.includes("mirai-console started successfully")){
                res()
            }
        });
        miraiProcess?.on("close",(code)=>{
            rej("~~~ MIRAI HAS BEEN CLOSED: "+ code + " ~~~");
        })
    })
    
    ipcMain.on("mirai",(event,arg)=>{
        console.log("~~~ MIRAI HAS BEEN SUBSCRIBED ~~~");
        miraiFinish.then(()=>{
            event.sender.send("mirai",{ msg : "started"})
        })
    })
    
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
app.on("ready", async () => {
    await Server.launch(13287);
    createMirai();
});

// 窗体全部关闭事件
app.on("window-all-closed", () => {
    Server.stop();
    Logger.log("window all closed");
    app.quit();
});

app.on("will-quit", () => {
    Logger.log("will quit");
});

app.on("before-quit", () => {
    Logger.log("before quit")
})

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
