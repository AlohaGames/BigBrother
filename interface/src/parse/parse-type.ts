export function parseNumber(value: string) {
  const number = Number(value);

  if (isNaN(number)) {
    throw new Error(`${value} is not a number`);
  }

  return number;
}
