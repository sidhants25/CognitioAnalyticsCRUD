const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, 'testpassword');

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
  authMiddleware,
};
