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
let miraiProcessId: null | number = null;
let miraiExit: Promise<number | null>;

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
    miraiProcess = spawn(
        path.join(miraiDir, "jre", "bin", "java.exe") +
            " -jar " +
            path.join(miraiDir, "mcl.jar"),
        {
            shell: true,
            cwd: miraiDir,
        }
    );
    if (!miraiProcess.stdout || !miraiProcess.stderr) {
        throw new Error("~~~无法打开mirai的标准输出流");
    }

    const head = "W/Processer: Mirai Process Id :";
    // 打印正常的后台可执行程序输出
    miraiProcess.stdout.on("data", function (data) {
        const dataStr = data.toString();
        if (dataStr.includes(head) && miraiProcessId == null) {
            const res = dataStr.split("|");
            miraiProcessId = parseInt(res[res.length - 1]);
            console.log(
                "~~~ 找到了，应该被kill的mirai进程ID为" +
                    miraiProcessId +
                    "~~~\n"
            );
        }
        console.log("Mirai[Data]: " + data);
    });

    // 打印错误的后台可执行程序输出
    miraiProcess.stderr.on("data", function (data) {
        console.log("Mirai[Error]: " + data);
    });

    // 退出之后的输出
    miraiProcess.on("close", async function (code) {
        console.log("Mirai[Exit]: " + code);
    });

    miraiExit = new Promise((res, rej) => {
        miraiProcess.on("close", function (code) {
            res(code);
        });
        app.on("quit", function () {
            rej("~~~ MIRAI HASN`T BEEN CLOSE");
        });
    });
}

function killMirai() {
    let killId = miraiProcess.pid;
    if (miraiProcessId != null) {
        killId = miraiProcessId;
    }
    console.log("~~~ WILL KILL MIRAI WITH PROCESS ID : " + killId + " ~~~");
    const interval = setInterval(() => exec("taskkill /pid " + miraiProcessId?.toString().trim() + " /F"),10);
    miraiExit.then((code) => { clearInterval(interval);console.log("~~~ MIRAI EXIT WITH CODE : " + code + " ~~~")} );
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
//窗体全部关闭事件
app.on("window-all-closed", () => {
    console.log("window all closed");
    killMirai();
    miraiExit.then(()=>{console.log("call app quit");app.quit(); })
});
// 退出前关闭Mirai进程
app.on("will-quit", () => {
    console.log("will quit");

});
app.on("before-quit",()=>{
    console.log("before quit")
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

