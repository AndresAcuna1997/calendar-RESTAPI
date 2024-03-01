const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already use",
      });
    }

    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.name);

    return res
      .status(201)
      .json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al crear usuario" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "There is no account with this email",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Password invalid" });
    }

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Something went wrong", error });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({ message: "renew!", token });
};

module.exports = { createUser, logIn, renewToken };
