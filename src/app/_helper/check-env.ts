export function isLocalEnv() {
  if (window.location.origin === 'http://localhost:4200') {
    return true;
  } else {
    return false;
  }
}
