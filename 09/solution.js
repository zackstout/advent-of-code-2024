import { data } from "./input.js";

const partOne = () => {
  const test = "12345";
  const test2 = "2333133121414131402";

  const parsed = data.split("").map(Number);

  // Woof lol, this was a pretty silly mistake, to not immediately realize that ids will get longer than single digit..

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

const partTwo = () => {
  // Idea: when parsing, keep track of index of each group (where it starts, and its size), and keep index of each gap (where it starts and its size)
  // Then we go through all chunks, in descending order, and look for first index with large enough gap, if one exists.
  // Tricky part is we need to update gaps as we do that.
  // Then at the end to build up the result we can iterate through while decreasing each chunk's size, in order of their indexes.

  const test = "2333133121414131402";

  function parse(str) {
    let idx = 0;
    let id = 0;
    const blanks = [];
    const files = {};
    for (let i = 0; i < str.length; i++) {
      const n = Number(str[i]);
      const isWriting = i % 2 === 0;
      if (isWriting) {
        files[id] = {
          size: n,
          start: idx,
          id,
        };

        id++;
      } else {
        blanks.push({ start: idx, size: n });
      }
      idx += n;
    }
    return { blanks, files, id: id - 1 };
  }

  const { blanks, files, id } = parse(data);

  let currId = id;
  while (currId >= 0) {
    // Oooh duh, we should NOT move it if the index is further right than ours!
    const firstAvailableGap = blanks.find((b) => b.size >= files[currId].size);
    if (firstAvailableGap && firstAvailableGap.start < files[currId].start) {
      // Move it there!
      files[currId].start = firstAvailableGap.start;
      firstAvailableGap.size -= files[currId].size;
      firstAvailableGap.start += files[currId].size;

      //   if (currId === 1) {
      //     console.log(files[currId].start, files[currId].size);
      //   }
    }

    currId--;
  }

  const res = Object.values(files).sort((a, b) => a.start - b.start);

  let total = 0;
  while (res.length > 0) {
    const next = res.shift();
    for (let i = next.start; i < next.start + next.size; i++) {
      total += i * next.id;
    }
  }

  return {
    total,
    files: Object.values(files).sort((a, b) => a.start - b.start),
  };
};

// Hmm... 5239966795 is too low....
// Wait a second.... yeah our ids are going to be more than single digit.... huh....

// Shoot, 4202827154936 is too low as well.... and it took 23 seconds.... hmm..
// ah the blank 0 gaps were the issue.

// for part two, 8607263107036 is too high... not sure where we went wrong...
// Ahhh duh we don't move them to the RIGHT ever!

console.time("solution");
console.log("Result: ", partTwo());
console.timeEnd("solution");
