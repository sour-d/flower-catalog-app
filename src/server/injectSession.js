const injectSession = (sessions) => (req, res, next) => {
  req.session = sessions.get(req.cookies?.sessionId);
  next();
};

module.exports = { injectSession };