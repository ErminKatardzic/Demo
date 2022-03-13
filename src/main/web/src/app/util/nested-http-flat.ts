export function nestedToPrefixedShallow(object: Object): { [key: string]: string } {
  const shallow: { [key: string]: string } = {};
  traverseAndFillShallow(object, '', shallow);
  return shallow;
}

function traverseAndFillShallow(object: Object, prefix: String, shallow: { [key: string]: string }): void {
  const addDelimiter = (a, b) => a ? `${a}.${b}` : b;

  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    const val = object[key];
    if (typeof val === null || Array.isArray(val)) {
      continue;
    }
    if (val instanceof Date) {
      shallow[addDelimiter(prefix, key)] = val.toISOString();
    }
    else if (typeof val === 'object') {
      traverseAndFillShallow(val, key, shallow);
    } else if (val !== null) {
      shallow[addDelimiter(prefix, key)] = String(val);
    }
  }
}
