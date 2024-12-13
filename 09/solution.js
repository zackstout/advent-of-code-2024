import { data } from "./input.js";

const partOne = () => {
  const test = "12345";
  const test2 = "2333133121414131402";

  const parsed = data.split("").map(Number);
  //   let res = "";
  //   let id = 0;
  //   let totalSpace = 0;
  //   for (let i = 0; i < parsed.length; i++) {
  //     const n = parsed[i];
  //     if (i % 2 === 0) {
  //       // Writing files
  //       for (let x = 0; x < n; x++) {
  //         res += id;
  //         totalSpace++;
  //       }
  //       id++;
  //     } else {
  //       // Writing blanks
  //       for (let x = 0; x < n; x++) {
  //         res += ".";
  //       }
  //     }
  //   }

  //   // Compact the hard drive:
  //   let hardDrive = res;
  //   let finalIdx = hardDrive.length - 1;
  //   for (let i = 0; i < totalSpace; i++) {
  //     if (hardDrive[i] === ".") {
  //       let lastChar = hardDrive[finalIdx];
  //       while (lastChar === ".") {
  //         finalIdx--;
  //         lastChar = hardDrive[finalIdx];
  //       }
  //       hardDrive = hardDrive.slice(0, i) + lastChar + hardDrive.slice(i + 1);

  //       finalIdx--;
  //     }
  //   }

  //   // Compute checksum
  //   let checksum = 0;
  //   for (let i = 0; i < totalSpace; i++) {
  //     checksum += i * hardDrive[i];
  //   }

  //   return { hardDrive: hardDrive.slice(0, totalSpace), totalSpace, checksum };

  // Keys are ids, values are number of blocks in that file
  const files = {};
  const spaces = [];

  let id = 0;
  let totalSpace = 0;
  for (let i = 0; i < parsed.length; i++) {
    const n = parsed[i];
    if (i % 2 === 0) {
      // Writing files
      files[id] = n;
      totalSpace += n;
      id++;
    } else {
      // Writing blanks
      spaces.push(n);
    }
  }
  const spacesCopy = [...spaces];

  const hardDrive = [];
  let blanksToProcess = 0;

  let writingFiles = true;
  while (hardDrive.length < totalSpace) {
    let file = 0;

    if (writingFiles) {
      const minFile = Math.min(
        ...Object.keys(files)
          .map(Number)
          .filter((k) => files[k] > 0)
      );
      file = minFile;
      files[minFile]--;
      if (files[minFile] === 0) {
        blanksToProcess = spaces.shift();

        // Ahhh yes this was the fix -- there are cases where a blank is 0 that we were mishandling
        if (blanksToProcess > 0) writingFiles = false;
      }
    } else {
      // We are writing to blank space, from the back
      const maxFile = Math.max(
        ...Object.keys(files)
          .map(Number)
          .filter((k) => files[k] > 0)
      );
      file = maxFile;
      files[maxFile]--;
      blanksToProcess--;
      if (blanksToProcess === 0) {
        writingFiles = true;
      }
    }

    hardDrive.push(file);
  }

  const checksum = hardDrive.reduce((acc, val, idx) => {
    return acc + val * idx;
  }, 0);

  return { files, spacesCopy, totalSpace, hardDrive, checksum };
};

const partTwo = () => {};

// Hmm... 5239966795 is too low....
// Wait a second.... yeah our ids are going to be more than single digit.... huh....

// Shoot, 4202827154936 is too low as well.... and it took 23 seconds.... hmm..
console.time("solution");
console.log("Result: ", partOne());
console.timeEnd("solution");
