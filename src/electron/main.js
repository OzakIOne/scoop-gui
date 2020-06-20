const { app, BrowserWindow } = require("electron");

function createWindow() {
    // create browser's window.
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile('../frontend/vanilla/index.html')
    // win.loadFile('../frontend/public/public_scss_ui/index.html')
    win.loadFile("../frontend/public/public_material_ui/index.html");
}

app.on("ready", createWindow);
