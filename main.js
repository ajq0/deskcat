const electron = require('electron');
const { app, BrowserWindow } = electron
const _ = require('lodash')

app.on('ready', () => {

  let displays = electron.screen.getAllDisplays()
  console.log(displays)

  displays = _.map(displays, display => {

    let Mywindow = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      height: display.bounds.height,
      width: display.bounds.width,
      transparent: true,
      frame: false,
      fullscreen: true,
      alwaysOnTop: true
    });

    let content = Mywindow.webContents
    Mywindow.setIgnoreMouseEvents(true)

    Mywindow.loadURL('file://' + __dirname + '/index.html');

    return {
      bounds: display.bounds,
      window: Mywindow,
      content: content
    }

  })

  //keep sending the mouse position to the window, because the window itself ignroes all mousemoves
  let sendMouse = () => {
    let mouse = electron.screen.getCursorScreenPoint()

    _.each(displays, display => {

      let bounds = display.bounds

      if (display.content) display.content.sendInputEvent({ type: "mouseMove", x: mouse.x - bounds.x, y: mouse.y })
    })
    // console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);

    setTimeout(sendMouse, 10)
  }
  sendMouse()

});
