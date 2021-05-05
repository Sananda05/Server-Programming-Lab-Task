const os = require("os");

const userInfo = os.userInfo();
console.log(userInfo);

const uptime = os.uptime();
console.log(uptime);

// const currentOS = {
//     name: os.type(),
//     release: os.release(),
//     totalMem: os.totalmem(),
//     freeMem: os.freemem(),
// };

// console.log(currentOS);