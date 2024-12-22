const jwt = require('jsonwebtoken');
const data = require('../data/users.data');

const authenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access Denied. No token provided.' });
  
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await data.getUserById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token.' });
    }
  };

module.exports = authenticated;