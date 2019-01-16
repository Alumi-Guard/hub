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

let mainWindow;

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
  mainWindow.close();
  autoUpdater.downloadUpdate();
  dialog.showMessageBox({
    type: "info",
    title: "Found Updates",
    message: "There are updates available, downloading them now..."
  });
});

autoUpdater.on("update-downloaded", info => {
  dialog.showMessageBox(
    {
      title: "Installing Updates",
      message: "Updates downloaded, Click Okay to restart :)"
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  await prepareNext("./renderer");

  mainWindow = new BrowserWindow({
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
