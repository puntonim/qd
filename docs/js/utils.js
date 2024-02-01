const sel = (selector) => {
  return document.querySelector(selector);
};

const hide = (selector) => {
  return sel(selector).style.display = "none";
};

const show = (selector, displayValue = "block") => {
  return sel(selector).style.display = displayValue;
};

const sleep = (msec) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};
