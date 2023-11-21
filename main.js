const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

const createWin = () => {
  const win = new BrowserWindow({
    height: 800,
    width: 800,

    webPreferences: {
      nativeWindowOpen: true,
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname,"preload.js"),
    },
  });

  

  const startUrl = url.format({
    pathname: path.join(__dirname, "/app/build/index.html"),
    protocol: "file",
  });

  // win.loadFile("./app/build/index.html")   //or
  win.loadURL(startUrl);
};

app.whenReady().then(() => {
  createWin();
});

//// Remember:- ipcMain module is an Event Emitter, used in the main process, it handles asynchronous and synchronous messages sent from a renderer process .

ipcMain.on("submit:data", (eve, data) => {
  console.log(data);
  fs.writeFileSync("./productdata/staticData.json", data);
});
