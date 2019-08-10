const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Cree la fenetre du navigateur.
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    win.setResizable(false)
}

app.on('ready', createWindow)