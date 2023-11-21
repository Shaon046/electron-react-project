const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

const productdata = JSON.parse(
  fs.readFileSync("./productData/staticData.json")
);

contextBridge.exposeInMainWorld("fileTransfer", {
  file: productdata,
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
});
