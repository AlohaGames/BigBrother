export function parseNumber(value: string) {
  const number = Number(value);

  if (isNaN(number)) {
    throw new Error(`${value} is not a number`);
  }

  return number;
}

export function parseBoolean(value: string): boolean {
  if (value === "true" || value === "1") {
    return true;
  }

  if (value === "false" || value === "0") {
    return false;
  }

  throw new Error(`${value} is not a boolean`);
}
