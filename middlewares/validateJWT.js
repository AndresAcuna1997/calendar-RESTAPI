const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: "Provide a valid JWT",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);

    req.uid = payload.uid;
    req.name = payload.name

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Something wrong with the token",
    });
  }

  next();
};

module.exports = { validateJWT };
