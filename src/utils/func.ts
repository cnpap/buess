export function resetApp() {
  return window.location.reload();
}

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function projectId() {
  const path = window.location.pathname;
  return path.split('/')[1];
}
