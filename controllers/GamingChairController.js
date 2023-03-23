import path from "path";
import fs from "fs";
import GamingChair from "../models/Tambahan/GamingChairModels.js";

export const getGamingChair = async (req, res) => {
  try {
    const response = await GamingChair.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getGamingChairById = async (req, res) => {
  try {
    const response = await GamingChair.findOne({
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

export const createGamingChair = async (req, res) => {
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
  )}/images/gamingChair/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/gamingChair/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await GamingChair.create({
        name: name,
        brand: req.body.vendor,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Gaming Chair Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateGamingChair = async (req, res) => {
  const gamingChair = await GamingChair.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!gamingChair) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = gamingChair.image;
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

    const filePath = `./public/images/gamingChair/${gamingChair.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/gamingChair/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get(
    "host"
  )}/images/gamingChair/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let price = req.body.price;

  if (name === "") {
    name = gamingChair.name;
  }
  if (brand === "") {
    brand = gamingChair.brand;
  }
  if (price === "") {
    price = gamingChair.price;
  }

  try {
    await GamingChair.update(
      {
        name: name,
        brand: brand,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: gamingChair.id,
        },
      }
    );
    res.status(200).json({ msg: "GamingChair Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteGamingChair = async (req, res) => {
  const gamingChair = await GamingChair.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!gamingChair) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/gamingChair/${gamingChair.image}`;
    fs.unlinkSync(filePath);
    await GamingChair.destroy({
      where: {
        id: gamingChair.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
