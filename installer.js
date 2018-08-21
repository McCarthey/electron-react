#!/usr/bin/env node

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const rimraf = require('rimraf')

deleteOutputFolder()
    .then(getInstallerConfig)
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    const rootPath = path.join(__dirname, '.')
    const outPath = path.join(rootPath, 'out')

    return Promise.resolve({
		appDirectory: path.join(outPath, 'electron-react-win32-ia32'),
		authors: 'McCarthey',
		description: 'Electron react demo',
        exe: 'electron-react.exe',
        iconUrl: 'https://raw.githubusercontent.com/electron/electron-api-demos/master/assets/app-icon/win/app.ico',
        loadingGif: path.join(rootPath, 'assets', 'img', 'loading.gif'),
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        setupExe: 'ElectronReactDemoSetup.exe',
        setupIcon: path.join(rootPath, 'app.ico'),
        skipUpdateIcon: true
    })
}

function deleteOutputFolder() {
    return new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, '..', 'out', 'windows-installer'), (error) => {
            error ? reject(error) : resolve()
        })
    })
}