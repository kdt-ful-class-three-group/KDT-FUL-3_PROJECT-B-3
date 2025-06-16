// electron.cjs
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
    },
  });

  // 개발 모드
  win.loadURL('http://localhost:5173');

  // 빌드된 정적 파일 사용 시
  // win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();
});
