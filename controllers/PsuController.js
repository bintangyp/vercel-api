import path from "path";
import fs from "fs";
import Psu from "../models/PsuModels.js";

export const getPsu = async (req, res) => {
  try {
    const response = await Psu.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPsuById = async (req, res) => {
  try {
    const response = await Psu.findOne({
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

export const createPsu = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/psu/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/psu/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Psu.create({
        name: name,
        brand: req.body.vendor,
        watt: req.body.watt,
        sertifikasi: req.body.sertification,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Psu  Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updatePsu = async (req, res) => {
  const psu = await Psu.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!psu) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = psu.image;
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

    const filePath = `./public/images/psu/${psu.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/psu/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/psu/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let watt = req.body.watt;
  let sertifikasi = req.body.sertification;
  let price = req.body.price;

  if (name === "") {
    name = psu.name;
  }
  if (brand === "") {
    brand = psu.vendor;
  }
  if (watt === "") {
    watt = psu.watt;
  }
  if (sertifikasi === "") {
    sertifikasi = psu.sertifikasi;
  }
  if (price === "") {
    price = psu.price;
  }

  try {
    await Psu.update(
      {
        name: name,
        brand: brand,
        watt: watt,
        sertifikasi: sertifikasi,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: psu.id,
        },
      }
    );
    res.status(200).json({ msg: "Psu  Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePsu = async (req, res) => {
  const psu = await Psu.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!psu) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/psu/${psu.image}`;
    fs.unlinkSync(filePath);
    await Psu.destroy({
      where: {
        id: psu.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
