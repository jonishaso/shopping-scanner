const fs = require("fs");
const path = require("path");

const CheckOut = require("./CheckOut");

const APPLE_TV = "atv";
const MACBOOK_PRO = "mbp";
const SUPER_IPAD = "ipd";
const VGA_ADAPTER = "vga";

const openingDaySpecials = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./specials.json"))
);

const checkOut = new CheckOut(openingDaySpecials);

checkOut.scanItem(APPLE_TV);
checkOut.scanItem(APPLE_TV);
checkOut.scanItem(APPLE_TV);
checkOut.scanItem(APPLE_TV);
checkOut.scanItem(APPLE_TV);
checkOut.scanItem(VGA_ADAPTER);
checkOut.scanItem(MACBOOK_PRO);
checkOut.scanItem(MACBOOK_PRO);
checkOut.scanItem(SUPER_IPAD);

console.log(checkOut.totalPrice());
