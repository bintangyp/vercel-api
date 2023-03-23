import path from "path";
import fs from "fs";
import GamingDesk from "../models/Tambahan/GamingDeskModels.js";

export const getGamingDesk = async (req, res) => {
  try {
    const response = await GamingDesk.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getGamingDeskById = async (req, res) => {
  try {
    const response = await GamingDesk.findOne({
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

export const createGamingDesk = async (req, res) => {
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
  )}/images/gamingDesk/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/gamingDesk/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await GamingDesk.create({
        name: name,
        brand: req.body.vendor,
        size: req.body.size,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Gaming Desk Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateGamingDesk = async (req, res) => {
  const gamingDesk = await GamingDesk.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!gamingDesk) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = gamingDesk.image;
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

    const filePath = `./public/images/gamingDesk/${gamingDesk.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/gamingDesk/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get(
    "host"
  )}/images/gamingDesk/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let size = req.body.size;
  let price = req.body.price;

  if (name === "") {
    name = gamingDesk.name;
  }
  if (brand === "") {
    brand = gamingDesk.brand;
  }
  if (size === "") {
    size = gamingDesk.size;
  }
  if (price === "") {
    price = gamingDesk.price;
  }

  try {
    await GamingDesk.update(
      {
        name: name,
        brand: brand,
        size: size,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: gamingDesk.id,
        },
      }
    );
    res.status(200).json({ msg: "Gaming Desk Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteGamingDesk = async (req, res) => {
  const gamingDesk = await GamingDesk.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!gamingDesk) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/gamingDesk/${gamingDesk.image}`;
    fs.unlinkSync(filePath);
    await GamingDesk.destroy({
      where: {
        id: gamingDesk.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
