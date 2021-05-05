//syncronus and asyncronus

//readfile
//writefile
//appendFile
//delete
//rename

const fs = require("fs");

// fs.writeFileSync(
//   "./contents/demoFile.txt",
//   "We are learning NodeJs. This is so interesting.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("successful!");
//     }
//   }
// );

// fs.appendFile(
//   "./contents/demoFile.txt",
//   " After this i wanna read Krishnakanter will.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("successful!");
//     }
//   }
// );

// fs.rename("./contents/demoFile.txt", "./contents/RenamedFile.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Renamed!");
//   }
// });

// fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// console.log("Befor");

// fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       fs.appendFile("./contents/RenamedFile.txt",
//         " is it syncronus?.",
//         (err) => {
//             console.log(err);
//     });
//     fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });

//     }
//   });
// console.log("After");

// fs.writeFileSync("./contents/demoFile.txt", "this will be deleted", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successful");
//   }
// });

fs.unlink("./contents/demoFile.txt",(err)=>
{
    if(!err){
        console.log("deleted Successfully");
    }
});
