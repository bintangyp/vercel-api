import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserByid = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password Confirm Wrong" });
  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      name: username,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Register Successfull" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  const { username, email, password, confPassword, role } = req.body;
  let hashPassword, newName, newEmail, newRole;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password Confirm Wrong" });
  if (username === "" || username === null) {
    newName = user.name;
  } else {
    newName = username;
  }
  if (email === "" || email === null) {
    newEmail = user.email;
  } else {
    newEmail = email;
  }
  if (role === "" || role === null) {
    newRole = user.role;
  } else {
    newRole = role;
  }

  try {
    await Users.update(
      {
        name: newName,
        email: newEmail,
        password: hashPassword,
        role: newRole,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Update Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found" });

  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
