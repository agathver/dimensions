module.exports = function (app) {
  app.locals = {
    app: {
      title: 'Dimensions'
    }
  };

  app.use(function (req, res, next) {
    res.locals.request = {
      url: req.url
    };
    res.locals.user = req.user;
    next();
  });
};
