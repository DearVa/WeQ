import { IpcRenderer, ipcRenderer } from 'electron';
import { ConsoleCatcher } from '../framework/console_catcher'

window.addEventListener("DOMContentLoaded", () => {
    window.ipcRenderer = ipcRenderer;
    console.log("↓Electron")
    console.log(window)
    console.log(document)
    console.log("")
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };
    const miniButton = document.getElementById("MinimizeButton")
    miniButton?.addEventListener("click", () => ipcRenderer.send("window-min"));

    const closeButton = document.getElementById("CloseButton")
    closeButton?.addEventListener("click", () => ipcRenderer.send("window-close"));

    for (const type of ["chrome", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    console.log("WHAT IS THIS")
    ipcRenderer.send("mirai");

    ipcRenderer.on("mirai",(e,a)=>{
        console.log(a)
        const butt = document.getElementById("miraiButton");
        butt?.click();
    })
});





declare global{
    interface Window{
        consoleCatcher:ConsoleCatcher,
        mirai:{},
        ipcRenderer:IpcRenderer,
    }
}
