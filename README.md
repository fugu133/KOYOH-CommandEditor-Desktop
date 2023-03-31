# KOYOH-CommandEditor

In this desktop application, You can edit the commands on a GUI basis and output them in a form that can be compiled by GSE.  
Developed with Electron and [JSON Editor](https://github.com/json-editor/json-editor)

## Get started

### npm

Node.js is required. If you have not installed Node.js, please install it from the [official page](https://nodejs.org/en).

After cloning the repository, run the following command to install the package.

```shell
cd KOYOH-CommandEditor-Desktop
npm install
```

To run application locally after installing the package, run the following command.
```
npm run start
```

Build the application, run the following command.

```shell
# For Mac OS (Intel CPU)
npx electron-builder --mac --x64 --dir

# For Mac OS (Arm CPU)
npx electron-builder --arm64 --dir

# For Windows
npx electron-builder --win --x64 --dir
```
