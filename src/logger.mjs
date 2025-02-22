export const log = (...messages) => {
  console.log(`[${new Date().toISOString()}]`, ...messages);
}

export const warn = (...messages) => {
  console.warn(`[${new Date().toISOString()}]`, ...messages);
}