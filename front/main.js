const electron = require("electron");
const { ipcMain } = require("electron");
const fs = require("fs");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow(arg) {
    mainWindow = new BrowserWindow({
        width: 480,
        height: 320,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(`file://${__dirname}/src/welcome/welcome.html`);
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("need-plant", (event, arg) => {
    const plant = fs.readFileSync("data/choice.txt", "utf8");
    event.reply("plant-needed", plant);
});

ipcMain.on("need-hum", (event, arg) => {
    const hum = fs.readFileSync("data/hum.txt", "utf8");
    event.reply("humidity", hum);
});

ipcMain.on("need-temp", (event, arg) => {
    const hum = fs.readFileSync("data/temp.txt", "utf8");
    var hu = 45;
    event.reply("temperature", hu);
});

ipcMain.on("temp_one", (event, arg) => {
    var temp0 = fs.readFileSync("data/temp_0.txt", "utf8");
    var temp10 = fs.readFileSync("data/temp_10.txt", "utf8");
    var temp20 = fs.readFileSync("data/temp_20.txt", "utf8");
    var temp30 = fs.readFileSync("data/temp_30.txt", "utf8");
    var dat = [temp0, temp10, temp20, temp30];
    event.reply("temp_one_answerd", dat);
});

ipcMain.on("temp_ultimate", (event, arg) => {
    var d = new Date();
    var n = d.getMonth() + 1;
    const plant = fs.readFileSync("data/choice.txt", "utf8");
    let fichier = fs.readFileSync("data/plant.json", "utf8");
    let personne = JSON.parse(fichier);
    if (n < 4 || n > 9) {
        var name = personne[plant]["temperature"]["hiver"];
    } else {
        var name = personne[plant]["temperature"]["été"];
    }
    event.reply("temp_ultimate", name);
});

ipcMain.on("PlanteInformation", (event, arg) => {
    let fichier = fs.readFileSync("data/plant.json", "utf8");
    let personne = JSON.parse(fichier);
    const plant = fs.readFileSync("data/choice.txt", "utf8");
    var Scientinom = personne[plant];
    var nom = personne[plant]["nom"];
    var temperature = [
        personne[plant]["temperature"]["hiver"],
        personne[plant]["temperature"]["été"],
    ];
    var eaux = [personne[plant]["eau"]["hiver"], personne[plant]["eau"]["été"]];
    var plante = [Scientinom, nom, temperature, eaux];
    event.reply("PlanteInformation", plante);
});