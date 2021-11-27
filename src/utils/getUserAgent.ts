export const getUserAgent = () => {
  const userAgent = window.navigator.userAgent;
  let type: number;
  if (userAgent.includes("Android")) {
    type = 1;
  } else if (userAgent.includes("iPhone")) {
    type = 2;
  } else if (userAgent.includes("iPad")) {
    type = 3;
  } else {
    type = 0;
  }
  return type
}