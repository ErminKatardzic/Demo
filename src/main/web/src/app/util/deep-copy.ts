export function deepCopy<T>(obj: T | undefined): T {
  return obj !== undefined ? JSON.parse(JSON.stringify(obj)) : undefined;
}
