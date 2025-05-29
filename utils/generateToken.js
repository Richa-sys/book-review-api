const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRE || '1d',
    }
  );
};

module.exports = generateToken;
