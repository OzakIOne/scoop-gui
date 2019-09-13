const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Cree la fenetre du navigateur.
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)