import Cookies from 'js-cookie';

// import { currentFabric } from '../pages/product/[productId]';

// import { ProductInFabric } from '../pages/product/[productId]';

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}

export function setStringifiedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function stringifiedCookieValue(value) {
  return JSON.stringify(value);
}

export function deleteCookie(key) {
  Cookies.remove(key);
}
