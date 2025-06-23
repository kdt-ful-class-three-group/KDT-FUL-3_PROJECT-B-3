import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL('http://localhost:4200'); // desktop-ui (React) 주소
}

app.whenReady().then(createWindow);
