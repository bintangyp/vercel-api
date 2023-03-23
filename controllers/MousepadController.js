import path from "path";
import fs from "fs";
import Mousepad from "../models/Tambahan/MouspadModels.js";

export const getMousepad = async (req, res) => {
  try {
    const response = await Mousepad.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMousepadById = async (req, res) => {
  try {
    const response = await Mousepad.findOne({
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

export const createMousepad = async (req, res) => {
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
  )}/images/mousepad/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/mousepad/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Mousepad.create({
        name: name,
        brand: req.body.vendor,
        size: req.body.size,
        ketebalan: req.body.ketebalan,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Mousepad Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMousepad = async (req, res) => {
  const mousepad = await Mousepad.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!mousepad) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = mousepad.image;
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

    const filePath = `./public/images/mousepad/${mousepad.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/mousepad/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/mousepad/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let size = req.body.size;
  let ketebalan = req.body.ketebalan;
  let price = req.body.price;

  if (name === "") {
    name = mousepad.name;
  }
  if (brand === "") {
    brand = mousepad.brand;
  }
  if (size === "") {
    size = mousepad.size;
  }
  if (ketebalan === "") {
    ketebalan = mousepad.ketebalan;
  }
  if (price === "") {
    price = mousepad.price;
  }

  try {
    await Mousepad.update(
      {
        name: name,
        brand: brand,
        size: size,
        ketebalan: ketebalan,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: mousepad.id,
        },
      }
    );
    res.status(200).json({ msg: "Mousepad Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMousepad = async (req, res) => {
  const mousepad = await Mousepad.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!mousepad) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/mousepad/${mousepad.image}`;
    fs.unlinkSync(filePath);
    await Mousepad.destroy({
      where: {
        id: mousepad.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
