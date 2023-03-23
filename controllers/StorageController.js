import Storage from "../models/StorageModel.js";
import path from "path";
import fs from "fs";

export const getStorage = async (req, res) => {
  let response;
  try {
    response = await Storage.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const getStorageById = async (req, res) => {
  try {
    const response = await Storage.findOne({
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
export const getStorageBySlot = async (req, res) => {
  try {
    const response = await Storage.findAll({
      where: {
        slotType: req.params.slotType,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStorage = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/storage/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/storage/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Storage.create({
        name: name,
        brand: req.body.vendor,
        type: req.body.type,
        slotType: req.body.slotType,
        size: req.body.size,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Storage Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateStorage = async (req, res) => {
  const storage = await Storage.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!storage) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = storage.image;
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

    const filePath = `./public/images/storage/${storage.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/storage/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/storage/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let type = req.body.type;
  let slotType = req.body.slotType;
  let size = req.body.size;
  let price = req.body.price;

  if (name === "") {
    name = storage.name;
  }
  if (brand === "") {
    brand = storage.brand;
  }

  if (type === "") {
    type = storage.type;
  }
  if (slotType === "") {
    slotType = storage.slotType;
  }
  if (size === "") {
    size = storage.size;
  }

  if (price === "") {
    price = storage.price;
  }

  try {
    await Storage.update(
      {
        name: name,
        brand: brand,
        type: type,
        slotType: slotType,
        size: size,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: storage.id,
        },
      }
    );
    res.status(200).json({ msg: "Storage Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteStorage = async (req, res) => {
  const storage = await Storage.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!storage) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/storage/${storage.image}`;
    fs.unlinkSync(filePath);
    await Storage.destroy({
      where: {
        id: storage.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
