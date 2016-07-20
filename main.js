/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
var xgphoto = require('./unit-gphoto.js');  // When you "require" the code will run, so make sure you have defined references first!!!!
var OLED = require('./unit-oled.js');
var HTTP = require('./unit-http.js');
var BAT = require('./unit-battery.js');
var PUT = require('./unit-http-put.js');
var WIFI = require('./unit-wifi.js');
var MENU = require('./unit-menu.js');
var TABLET = require('./unit-tablet.js');
var loadconfig = require('./unit-configuration.js');
var winston = require('winston');



winston.add(winston.transports.File, {filename: 'data-log.txt', dirname: '/home/root/logs', maxsize : 131072}); // 1Mb in size

winston.log('info', 'Welcome to the FoxyBox Embedded Application running on the Intel Edison.');
winston.log('info', 'Powered by FoundryBox™');

exports.log = function(infoType, logMessage)
{
   var date = new Date();
   winston.log(infoType, date.toTimeString()  + ' ' + logMessage);   
};  

var defaultOptions = loadconfig.INIT();
console.log("Configuration read from the JSON file using nconf is :")
console.log(defaultOptions);

// Start the OLED
OLED.INIT_oled();

// Start the HTTP server
HTTP.start();

// Start WiFi
WIFI.INITwifi();

// Start the server uploads
PUT.INIT();

// Start the menu and buttons
MENU.INIT();

// Start the tabet monitor
TABLET.INIT();

// Start the camera links
xgphoto.INITcamera();

//this.log('info','Starting OLED Monitor')
//setInterval(function () {
//    var cam = xgphoto.getCameraID();
//    //OLED.clearOLED();
//    OLED.drawText(0,0,'CC:' + (xgphoto.getCameraConnected() !== (true) ? "No" : "OK"));
//    OLED.drawText(34,0,'TE:' + (xgphoto.getCameraIsTethered() !== (true) ? "No" : "OK"));
//    OLED.drawText(0,2,'ID: ' + cam.substr(0, 6));
//    OLED.drawText(0,1,'BT: ' + BAT.getBatteryLevel() + '%');
//    //OLED.drawText(0,4,'Time: ' + date.getHours()+':'+date.getMinutes());
//    OLED.drawText(0,3,'IP: ' + WIFI.getIPAddress().slice(8,16));
//    OLED.drawText(0,4, WIFI.getSSID());
//    OLED.drawText(0,5,'IC: ' + xgphoto.getImageCount());
//}, 1000);