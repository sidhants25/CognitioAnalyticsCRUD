const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  const token = jwt.sign({ userId: user.id }, 'testpassword', {
    expiresIn: '1h',
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'testpassword');
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePasswords,
};
