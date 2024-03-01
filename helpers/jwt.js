const jwt = require("jsonwebtoken");
const { resolve } = require("styled-jsx/css");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: "2h" },

      (err, token) => {
        if (err) {
          console.log(err);
          reject("Cannot generate jwt");
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
