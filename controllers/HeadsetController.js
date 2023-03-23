import path from "path";
import fs from "fs";
import Headset from "../models/Tambahan/HeadsetModels.js";

export const getHeadset = async (req, res) => {
  try {
    const response = await Headset.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getHeadsetById = async (req, res) => {
  try {
    const response = await Headset.findOne({
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

export const createHeadset = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/headset/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/headset/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Headset.create({
        name: name,
        brand: req.body.vendor,
        portKoneksi: req.body.connection,
        panjangKabel: req.body.cableLenght,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Headset Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateHeadset = async (req, res) => {
  const headset = await Headset.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!headset) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = headset.image;
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

    const filePath = `./public/images/headset/${headset.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/headset/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/headset/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let portKoneksi = req.body.connection;
  let panjangKabel = req.body.cableLenght;
  let price = req.body.price;

  if (name === "") {
    name = headset.name;
  }
  if (brand === "") {
    brand = headset.brand;
  }
  if (portKoneksi === "") {
    portKoneksi = headset.portKoneksi;
  }
  if (panjangKabel === "") {
    panjangKabel = headset.panjangKabel;
  }
  if (price === "") {
    price = headset.price;
  }

  try {
    await Headset.update(
      {
        name: name,
        brand: brand,
        portKoneksi: portKoneksi,
        panjangKabel: panjangKabel,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: headset.id,
        },
      }
    );
    res.status(200).json({ msg: "Headset Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteHeadset = async (req, res) => {
  const headset = await Headset.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!headset) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/headset/${headset.image}`;
    fs.unlinkSync(filePath);
    await Headset.destroy({
      where: {
        id: headset.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
