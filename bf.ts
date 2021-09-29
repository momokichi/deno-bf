import { Stack } from "./stack.ts";
import { BufReader } from "https://deno.land/std/io/mod.ts";

const Token = {
  Increment: "+",
  Decrement: "-",
  Right: ">",
  Left: "<",
  LoopStart: "[",
  LoopEnd: "]",
  Input: ",",
  Output: ".",
} as const;

type Token = typeof Token[keyof typeof Token];

export const bf = async (code: string): Promise<string> => {
  let p = 0, i = 0;
  const memSize = 5096;
  const mem: number[] = Array(memSize).fill(0);
  const st = new Stack<number>();
  let decode = "";


  for (const c of code) {
    switch (c) {
      case Token.Increment:
        mem[p]++;
        break;
      case Token.Decrement:
        mem[p]--;
        break;
      case Token.Right:
        p++;
        break;
      case Token.Left:
        p--;
        break;
      case Token.LoopStart:
        console.log('loop start')
        st.push(i);
        if (mem[p] == 0) {
          console.log('mem[p] == 0')
          let depth = 1;
          while (depth > 0) {
            i++;
            if (i >= code.length) throw Error("Error: cannot found token `]`");
            console.log(code[i])
            if (code[i] == Token.LoopStart){ depth++; console.log('depth++')}
            if (code[i] == Token.LoopEnd){ depth--; console.log('depth--')}
          }
          st.pop();
        }
        break;
      case Token.LoopEnd:
        console.log('loop end')
        if (st.empty()) {
          throw Error("Error: cannot found token `[`");
        }
        i = st.top - 1;
        st.pop()
        break;
      case Token.Input:
        mem[p] = await getChar();
        break;
      case Token.Output:
        console.log(mem[p])
        decode += String.fromCodePoint(mem[p]);
        console.log(decode)
        break;
      default:
        break;
    }
    i++;
  }
  return decode;
};

const getChar = async () => {
  const reader = new BufReader(Deno.stdin);
  const readLineResult = await reader.readLine();
  if (readLineResult == null) throw Error();
  const input = new TextDecoder().decode(readLineResult.line);
  const char = input[0];
  return char.charCodeAt(0);
};
