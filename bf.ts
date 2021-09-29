const Token = {
  Increment: "+",
  Decrement: "-",
  Right: ">",
  Left: "<",
  LoopStart: "[",
  LoopEnd: "]",
  Input: ",",
  OutPut: ".",
} as const;

type Token = typeof Token[keyof typeof Token];

export const bf = (code: string): string => {
  let p = 0;
  const memSize = 1024;
  const mem: number[] = Array(memSize).fill(0);
  let decode = "";
  for (const c of code) {
  }
  return decode;
};
