module.exports = (fieldName) => (req, res, next) => {
  if (req.file) {
    req.body[fieldName] = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
  }
  next();
};
