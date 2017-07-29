/*

Set up a bluetooth controller HID to use for push to talk.

Use case here is to stick Puck.js on the back of a console game controller
for easy push to talk on Mumble (Or TeamSpeak, or Discord, etc)

*/

var report = new Uint8Array([

0x05, 0x01,        // Usage Page (Generic Desktop Ctrls)
0x09, 0x04,        // Usage (Joystick)
0xA1, 0x01,        // Collection (Application)
0x09, 0x04,        //   Usage (Joystick)
0xA1, 0x00,        //   Collection (Physical)
0x05, 0x09,        //     Usage Page (Button)
0x19, 0x01,        //     Usage Minimum (0x01)
0x29, 0x01,        //     Usage Maximum (0x01) - Increase this for more buttons
0x15, 0x00,        //     Logical Minimum (0)
0x25, 0x01,        //     Logical Maximum (1)
0x95, 0x08,        //     Report Count (8) - Has to report multiples of 8
0x75, 0x01,        //     Report Size (1)
0x81, 0x02,        //     Input (Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position)
0xC0,              //   End Collection
0xC0,              // End Collection

]);


NRF.setServices(undefined, { hid : report });

function press() {
  NRF.sendHIDReport(0x1, function callback() {});
}

function unpress() {
  NRF.sendHIDReport(0, function callback() {});
}

setWatch(function() {
  //console.log("Pressed");
  press();
}, BTN, {edge:"rising", debounce:50, repeat:true});

setWatch(function() {
  //console.log("Released");
  unpress();
}, BTN, {edge:"falling", debounce:50, repeat:true});