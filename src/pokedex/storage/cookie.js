export function getCookie(name = null) {
  const re = new RegExp(`${name}=([^;]+)`);
  const value =
    typeof document !== 'undefined' ? re.exec(document.cookie) : null;
  const cookieValue = value != null ? decodeURI(value[1]) : null;
  if (cookieValue === 'undefined') {
    return null;
  }
  return cookieValue;
}
