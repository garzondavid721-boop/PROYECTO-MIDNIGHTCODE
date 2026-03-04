const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const blacklisted = await prisma.tokenBlacklist.findFirst({
      where: { token }
    });

    if (blacklisted)
      return res.status(401).json({ message: "Requiere iniciar sesión" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Sesión expirada" });
  }
};