export const convertBase = (value: string) => {
  return {
    from: (baseForm: number) => {
      return {
        to: (baseTo: number) => {
          return parseInt(value, baseForm).toString(baseTo);
        },
      };
    },
  };
};

export const binaryAddition = (a: string, b: string) => {
  let result = '';
  let carry = 0;

  while (a || b || carry) {
    let sum = +a.slice(-1) + +b.slice(-1) + carry;

    if (sum > 1) {
      result = (sum % 2) + result;
      carry = 1;
    } else {
      result = sum + result;
      carry = 0;
    }

    a = a.slice(0, -1);
    b = b.slice(0, -1);
  }

  return result;
};

export const complementA1 = (value: string) => {
  let result = '';

  for (let binaryValue of value) {
    if (binaryValue === '0') {
      result += '1';
    } else {
      result += '0';
    }
  }

  return result;
};
