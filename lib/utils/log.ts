export function debug(...args: any[]) {
  console.debug("🔵", ...args);
}

export function info(...args: any[]) {
  console.info("🟡", ...args);
}

export function error(...args: any[]) {
  console.error("🔴", ...args);
}
