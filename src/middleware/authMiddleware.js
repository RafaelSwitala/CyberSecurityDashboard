const jwt = require('jsonwebtoken');

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Kein Token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Keine Berechtigung' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token ungültig' });
    }
  };
}

module.exports = { authorizeRoles };
