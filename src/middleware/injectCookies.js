const parseCookie = (cookieString) => {
  const cookies = cookieString.split(';');
  const parsedCookies = {};

  cookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    parsedCookies[key.trim()] = value.trim();
  });

  return parsedCookies;
};

const injectCookies = (req, res, next) => {
  const cookieString = req.get('Cookie');
  req.cookies = cookieString ? parseCookie(cookieString) : {};
  next();
};

module.exports = { injectCookies };
