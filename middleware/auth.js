const config = require('config');
const jwt = require('jsonwebtoken');

// Purpose: get the token sent from REACT, Postman or whatver front end you're using 
function auth(req, res, next) {       // next = move onto the next middleware
  const token = req.header('x-auth-token');  // get token from the header

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })  // 401 = denied authorization
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();

  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;