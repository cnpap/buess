export function resetApp() {
  return window.location.reload();
}

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
