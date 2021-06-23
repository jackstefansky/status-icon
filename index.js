const spawn = require("child_process").spawn;
const electron = require("electron");

module.exports = function() {
  const ps = spawn(electron, [__dirname + "/electron.js"], {
    stdio: [null, null, null, "ipc"]
  });

  let initialized = false;
  let lastIcon = null;
  let lastMenu = null;

  ps.on("message", function(msg) {
    if (msg === "initialized") {
      initialized = true;
      if (lastIcon) {
        ps.send({
          "type": "icon",
          "icon":icon
        });
      }

      if(lastMenu) {
        ps.send({
          "type": "menu",
          "menu": menu
        });
      }
    }
  });

  return {
    destroy: function() {
       ps.kill();
    },
    setIcon: function(icon) {
      if (initialized) {
        ps.send({
          "type": "icon",
          "icon":icon
        });
      } else {
        lastIcon = icon;
      }
    },
    setMenu: function(menu) {
      if (initialized) {
        ps.send({
          "type": "menu",
          "menu": menu
        });
      } else {
        lastMenu = menu;
      }
    },
  };
};
