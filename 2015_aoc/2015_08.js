const run = () => {
  const str = `"v\xfb\"lgs\"kvjfywmut\x9cr"`;
  const str2 = `"aaa\"aaa"`;
  const str3 = `"\x27"`;
  //   console.log(str, str.length);
  // Ok this seems to correctly give us the "number of characters in the string in memory"
  const numCharsInString = str.split("").length - 2;

  //   return numCharsInString;

  // Huh.... not sure.... eval doesn't seem to work.... unexected identifier...
  return str.split("\n").map((x) => eval(x).length);
};

console.log(run());
