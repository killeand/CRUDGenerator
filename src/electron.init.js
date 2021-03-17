const { app, BrowserWindow } = require('electron');

app.on("ready", () => {
    let window = new BrowserWindow({width: 800, height: 640});
    window.loadURL(`file://${__dirname}/main.html`);
});