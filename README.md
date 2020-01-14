# Workflow to export WINDOWS/ MacOS Native App:

> **Commands**:

- start new React App
  > npx create-react-app app
- install needed packages for development
  > npm install electron electron-builder wait-on concurrently --dev-save
- install package to detect wether you want to work as developer or not
  > npm install electron-is-dev

# Create Electron script

create electron.js in the "/public" folder and insert code for this worker from main page: [https://electronjs.org/docs/tutorial/first-app#installing-electron](https://electronjs.org/docs/tutorial/first-app#installing-electron) look under "Installiere Electron"

# Set Package.json

> set package.json file(add)( scripts add to scripts)(homepage shows warning):
> `"main": "public/electron.js", "author": "Name Surname", "homepage": "./" "scripts": { "electron-dev": "concurrently "BROWSER=none npm run start" "wait-on [http://localhost:3000](http://localhost:3000/) && electron ."", "electron-pack": "electron-builder -c.extraMetadata.main=build/electron.js", (in this case i used another name main.js) "preelectron-pack": "npm run build", (use only in react projects, if react has to be prebuild before compilling as electron) "postinstall": "electron-builder install-app-deps" } "build": { "appId": "com.tm.montagetechnik", "files": [ "build/**/*", "node_modules/**/*" ], "directories":{ "buildResources": "assets" } }`

# Compile

After operations in package.json we can work in this directory, either with Web Version or Native.
With a command "npm run electron-pack" code will be compiled in "/build" folder for Web, "/dist" for Native. /build can be deployed on server, Dist folder has install.exe(win) file to install app

# WICHTIG

main.js is a script for building electron-app
in package.json under ' "electron-pack": "electron-builder -c.extraMetadata.main=build/main.js"' is a path of its location(it could be wherever you wish)
This represents path to file(page) that will be first page:

```javascript
 mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./hauptmenu/index.htm")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}
```

keep in mind that is all your files are in the "build" directory it will create the same directory after installing app and the sctructure will be the same,
so if first page located as "buils/index.html" then use "./index.html" as path in main.js

# Start

in devMode just use "npm start" it runs server and react on it

> **WARNING!!!** : Dependencies >>> "electron": "5.0.7", "electron-builder": "^21.1.1", "concurrently": "^4.1.1" has to be stored in package.json under "devDependencies" :{} otherwise problems

# P.S

(deprecated)P.S. if you have some issues with images, add into public/index.html before using electron-pack

# Links

Some links, that can help if you get into trable: [https://medium.com/@badbrotherblake/great-article-thanks-heaps-in-case-it-helps-anyone-i-had-to-add-this-to-my-package-json-scripts-aa49657f8abd](https://medium.com/@badbrotherblake/great-article-thanks-heaps-in-case-it-helps-anyone-i-had-to-add-this-to-my-package-json-scripts-aa49657f8abd)[https://medium.com/p/e93f9761f86f/responses/show](https://medium.com/p/e93f9761f86f/responses/show) [https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)

Alternative: Prebuild Project to create on top of it yout App [https://github.com/electron-react-boilerplate/electron-react-boilerplate?source=post_page---------------------------](https://github.com/electron-react-boilerplate/electron-react-boilerplate?source=post_page---------------------------)
