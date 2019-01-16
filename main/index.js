const { format } = require("url");
const { BrowserWindow, app, Menu, dialog } = require("electron");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

let template = [];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click() {
          app.quit();
        }
      }
    ]
  });
}

autoUpdater.on("error", error => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

// autoUpdater.on("update-not-available", () => {
//   dialog.showMessageBox({
//     title: "No Updates",
//     message: "Current version is up-to-date."
//   });
//   updater.enabled = true;
// });

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(
    {
      type: "info",
      title: "Found Updates",
      message:
        "Found updates, Going to download them now. Your window will close when the update is ready to install.",
      buttons: ["Okay"]
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      }
    }
  );
});

autoUpdater.on("update-downloaded", info => {
  dialog.showMessageBox(
    {
      title: "Installing Updates",
      message: "Updates downloaded, application will restart to update..."
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  autoUpdater.checkForUpdates();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // For Dev Testing
  mainWindow.webContents.openDevTools();

  const devPath = "http://localhost:8000/start";

  const prodPath = format({
    pathname: resolve("renderer/out/start/index.html"),
    protocol: "file:",
    slashes: true
  });

  const url = isDev ? devPath : prodPath;
  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
