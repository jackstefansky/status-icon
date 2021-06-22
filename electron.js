const {app, Tray} = require('electron');

let appIcon = null;
app.dock.hide()
app.on('ready', () => {
  appIcon = new Tray(__dirname + '/blue.png');
  process.send('initialized');
  process.on('message', function (image) {
    appIcon.setImage(image);
  });
});
