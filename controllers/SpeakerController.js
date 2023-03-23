import path from "path";
import fs from "fs";
import Speaker from "../models/Tambahan/SpeakerModels.js";

export const getSpeaker = async (req, res) => {
  try {
    const response = await Speaker.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSpeakerById = async (req, res) => {
  try {
    const response = await Speaker.findOne({
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

export const createSpeaker = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/speaker/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/speaker/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Speaker.create({
        name: name,
        brand: req.body.brand,
        koneksi: req.body.koneksi,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Speker Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateSpeaker = async (req, res) => {
  const speaker = await Speaker.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!speaker) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = speaker.image;
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

    const filePath = `./public/images/speaker/${speaker.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/speaker/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/speaker/${fileName}`;
  let name = req.body.title;
  let brand = req.body.brand;
  let koneksi = req.body.koneksi;
  let price = req.body.price;

  if (name === "") {
    name = speaker.name;
  }
  if (brand === "") {
    brand = speaker.brand;
  }
  if (koneksi === "") {
    koneksi = speaker.koneksi;
  }
  if (price === "") {
    price = speaker.price;
  }

  try {
    await Speaker.update(
      {
        name: name,
        brand: brand,
        koneksi: koneksi,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: speaker.id,
        },
      }
    );
    res.status(200).json({ msg: "Speker Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSpeaker = async (req, res) => {
  const speaker = await Speaker.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!speaker) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/speaker/${speaker.image}`;
    fs.unlinkSync(filePath);
    await Speaker.destroy({
      where: {
        id: speaker.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
