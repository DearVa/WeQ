import { ipcRenderer } from 'electron';
import { MiraiHelper } from "../framework/mirai_helper";

window.addEventListener("DOMContentLoaded", () => {

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

    //MiraiHelper.initialize();
});
