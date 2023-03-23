import path from "path";
import fs from "fs";
import Mouse from "../models/Tambahan/MouseModels.js";

export const getMouse = async (req, res) => {
  try {
    const response = await Mouse.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMouseById = async (req, res) => {
  try {
    const response = await Mouse.findOne({
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

export const createMouse = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/mouse/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/mouse/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Mouse.create({
        name: name,
        brand: req.body.brand,
        koneksi: req.body.koneksi,
        button: req.body.button,
        rgb: req.body.rgb,
        resolusi: req.body.resolusi,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Mouse Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMouse = async (req, res) => {
  const mouse = await Mouse.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!mouse) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = mouse.image;
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

    const filePath = `./public/images/mouse/${mouse.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/mouse/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/mouse/${fileName}`;
  let name = req.body.title;
  let brand = req.body.brand;
  let koneksi = req.body.koneksi;
  let button = req.body.button;
  let rgb = req.body.rgb;
  let resolusi = req.body.resolusi;
  let price = req.body.price;

  if (name === "") {
    name = mouse.name;
  }
  if (brand === "") {
    brand = mouse.brand;
  }
  if (koneksi === "") {
    koneksi = mouse.koneksi;
  }
  if (button === "") {
    button = mouse.button;
  }
  if (rgb === "") {
    rgb = mouse.rgb;
  }
  if (resolusi === "") {
    resolusi = mouse.resolusi;
  }
  if (price === "") {
    price = mouse.price;
  }

  try {
    await Mouse.update(
      {
        name: name,
        brand: brand,
        koneksi: koneksi,
        button: button,
        rgb: rgb,
        resolusi: resolusi,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: mouse.id,
        },
      }
    );
    res.status(200).json({ msg: "Mouse Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMouse = async (req, res) => {
  const mouse = await Mouse.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!mouse) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/mouse/${mouse.image}`;
    fs.unlinkSync(filePath);
    await Mouse.destroy({
      where: {
        id: mouse.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
