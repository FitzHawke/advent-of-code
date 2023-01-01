type Wires = {
  [key: string]: Ops;
};
type Ops = {
  op1?: string;
  op2: string;
  oper: Oper;
};
type Oper = 'l' | 'r' | 'a' | 'o' | 'n' | 'd';

export const parseInput = (input: string): Wires => {
  const wires = {} as Wires;
  input.split('\n').forEach((wire) => {
    const op = wire.split(' ');
    if (op.length === 3) {
      wires[op.at(-1)!] = {
        op2: op[0],
        oper: 'd',
      };
    } else if (op.length === 4) {
      wires[op.at(-1)!] = {
        op2: op[1],
        oper: 'n',
      };
    } else {
      let oper: Oper = 'd';
      if (op[1] === 'AND') oper = 'a';
      else if (op[1] === 'OR') oper = 'o';
      else if (op[1] === 'LSHIFT') oper = 'l';
      else if (op[1] === 'RSHIFT') oper = 'r';

      wires[op.at(-1)!] = {
        op1: op[0],
        op2: op[2],
        oper,
      };
    }
  });
  return wires;
};

export const runCircuit = (wires: Wires): number => {
  let vals = new Map() as Map<string, number>;
  let stack = ['a'];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    if (vals.has(cur)) continue;

    if (!isNaN(Number(cur))) {
      vals.set(cur, Number(cur));
      continue;
    }

    switch (wires[cur].oper) {
      case 'd':
        if (vals.has(wires[cur].op2)) {
          vals.set(cur, vals.get(wires[cur].op2)!);
        } else {
          stack.push(cur);
          stack.push(wires[cur].op2);
        }
        break;
      case 'n':
        if (vals.has(wires[cur].op2)) {
          vals.set(cur, ~vals.get(wires[cur].op2)!);
        } else {
          stack.push(cur);
          stack.push(wires[cur].op2);
        }
        break;
      case 'a':
        if (vals.has(wires[cur].op1!) && vals.has(wires[cur].op2)) {
          vals.set(cur, vals.get(wires[cur].op1!)! & vals.get(wires[cur].op2)!);
        } else {
          stack.push(cur);
          stack.push(wires[cur].op1!);
          stack.push(wires[cur].op2);
        }
        break;
      case 'o':
        if (vals.has(wires[cur].op1!) && vals.has(wires[cur].op2)) {
          vals.set(cur, vals.get(wires[cur].op1!)! | vals.get(wires[cur].op2)!);
        } else {
          stack.push(cur);
          stack.push(wires[cur].op1!);
          stack.push(wires[cur].op2);
        }
        break;
      case 'l':
        if (vals.has(wires[cur].op1!) && vals.has(wires[cur].op2)) {
          vals.set(
            cur,
            vals.get(wires[cur].op1!)! << vals.get(wires[cur].op2)!,
          );
        } else {
          stack.push(cur);
          stack.push(wires[cur].op1!);
          stack.push(wires[cur].op2);
        }
        break;
      case 'r':
        if (vals.has(wires[cur].op1!) && vals.has(wires[cur].op2)) {
          vals.set(
            cur,
            vals.get(wires[cur].op1!)! >> vals.get(wires[cur].op2)!,
          );
        } else {
          stack.push(cur);
          stack.push(wires[cur].op1!);
          stack.push(wires[cur].op2);
        }
        break;
    }
  }

  return vals.get('a')!;
};

const main = (input: string): number => {
  const wires = parseInput(input);
  const val = runCircuit(wires);
  return val;
};

export default function (input: string): number {
  console.log('\nDay 07: Some Assembly Required\nPart A');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
