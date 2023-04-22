'use strict';

const { app, BrowserWindow, dialog, shell, ipcMain } = require("electron");
const fs = require('fs');

let mainWindow;

//アプリウィンドウの作成
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1080, height: 2160, webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/preload.js'
        }
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setMenuBarVisibility(false);
}

// 初期化終了後実行
app.on('ready', function () {
    createWindow();
    ipcMain.handle('save-file', saveFile);
    ipcMain.handle('conv-cmd', executeCmdConverter);
});

// アプリ終了時実行
app.on('window-all-closed', () => {
    // Mac
    if (process.platform !== 'darwin') {
        mainWindow = null;
        app.quit()
    }
});

// アクティブ化実行
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});


async function saveFile(event, data) {
    // モーションファイルを選択
    const path = dialog.showSaveDialogSync(mainWindow, {
        buttonLabel: 'File save',
        filters: [
            { name: 'JSON', extensions: ['json'] },
        ],
        properties: [
            'createDirectory',  // ディレクトリの作成を許可
        ]
    });

    // キャンセルで閉じた場合
    if (path === undefined) {
        return ({ status: undefined });
    }

    // ファイルの内容を返却
    try {
        fs.writeFileSync(path, JSON.stringify(data), 'utf8');

        return ({
            status: true,
            path: path,
        });
    }
    catch (error) {
        return ({ status: false, message: error.message });
    }
}

async function executeCmdConverter(event, path) {
    const envPath = require('path');
    const script = envPath.join('assets', 'cmd-converter.exe');
    const exec = require('child_process').exec;
    const inpoutPath = path;
    const parsedPath = envPath.parse(path);
    const outputPath = parsedPath.dir + envPath.sep + parsedPath.name + '_raw_cmd' + '.json';

    let cmd = script + ' ' + inpoutPath + ' ' + outputPath;

    console.log(cmd);

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            // console.log(stdout);
            // console.log(stderr);
        }
    });
}