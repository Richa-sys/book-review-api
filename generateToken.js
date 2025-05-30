<<<<<<< HEAD
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
=======
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
>>>>>>> 72ce1d88b9cd0e9561a6f6874df614793e131656
