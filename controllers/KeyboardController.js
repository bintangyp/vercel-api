import path from "path";
import fs from "fs";
import Keyboard from "../models/Tambahan/KeyboardModels.js";

export const getKeyboards = async (req, res) => {
  try {
    const response = await Keyboard.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKeyboardById = async (req, res) => {
  try {
    const response = await Keyboard.findOne({
      where: {
        id: req.params.id,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createKeyboard = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/images/keyboard/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/keyboard/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Keyboard.create({
        name: name,
        brand: req.body.vendor,
        type: req.body.type,
        koneksi: req.body.connection,
        size: req.body.size,
        switchType: req.body.switchType,
        rgb: req.body.rgb,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Keyboard Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateKeyboard = async (req, res) => {
  const keyboard = await Keyboard.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!keyboard) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = keyboard.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const random = (Math.random() * 9999).toFixed();
    fileName = file.md5 + random + ext;
    const allowType = [".png", ".jpg", ".jpeg"];

    if (!allowType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5MB" });

    const filePath = `./public/images/keyboard/${keyboard.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/keyboard/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/keyboard/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let type = req.body.type;
  let koneksi = req.body.connection;
  let size = req.body.size;
  let switchType = req.body.switchType;
  let rgb = req.body.rgb;
  let price = req.body.price;

  if (name === "") {
    name = keyboard.name;
  }
  if (brand === "") {
    brand = keyboard.brand;
  }
  if (type === "") {
    type = keyboard.type;
  }
  if (koneksi === "") {
    koneksi = keyboard.koneksi;
  }
  if (size === "") {
    size = keyboard.size;
  }
  if (switchType === "") {
    switchType = keyboard.switchType;
  }
  if (rgb === "") {
    rgb = keyboard.rgb;
  }
  if (price === "") {
    price = keyboard.price;
  }

  try {
    await Keyboard.update(
      {
        name: name,
        brand: brand,
        type: type,
        koneksi: koneksi,
        size: size,
        switchType: switchType,
        rgb: rgb,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: keyboard.id,
        },
      }
    );
    res.status(200).json({ msg: "Keyboard Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteKeyboard = async (req, res) => {
  const keyboard = await Keyboard.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!keyboard) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/keyboard/${keyboard.image}`;
    fs.unlinkSync(filePath);
    await Keyboard.destroy({
      where: {
        id: keyboard.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
