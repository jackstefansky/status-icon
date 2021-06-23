const {app, Menu, Tray} = require('electron');

let appTray = null;
app.dock.hide()
app.on('ready', () => {
  appTray = new Tray(__dirname + '/blue.png');
  process.send('initialized');
  process.on('message', function (msg) {

    if(msg.type == "icon") {
      appTray.setImage(msg.icon);
    }

    if(msg.type == "menu") {
      appTray.setContextMenu( Menu.buildFromTemplate(msg.menu))
    }

  });
});
