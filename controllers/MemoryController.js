import Memory from "../models/MemoryModel.js";
import path from "path";
import fs from "fs";

export const getMemory = async (req, res) => {
  try {
    const response = await Memory.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMemoryById = async (req, res) => {
  try {
    const response = await Memory.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMemoryByType = async (req, res) => {
  try {
    const response = await Memory.findAll({
      where: {
        type: req.params.type,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMemory = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/memory/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/memory/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Memory.create({
        name: name,
        type: req.body.type,
        size: req.body.size,
        speed: req.body.speed,
        channel: req.body.channel,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Memory Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMemory = async (req, res) => {
  const memory = await Memory.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!memory) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = memory.image;
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

    const filePath = `./public/images/memory/${memory.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/memory/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/memory/${fileName}`;
  let name = req.body.title;
  let type = req.body.type;
  let size = req.body.size;
  let speed = req.body.speed;
  let channel = req.body.channel;
  let price = req.body.price;

  if (name === "" || name === null) {
    name = memory.name;
  }
  if (type === "" || type === null) {
    type = memory.type;
  }
  if (size === "" || size === null) {
    size = memory.size;
  }
  if (speed === "" || speed === null) {
    speed = memory.speed;
  }
  if (channel === "" || channel === null) {
    channel = memory.channel;
  }
  if (price === "") {
    price = memory.price;
  }

  try {
    await Memory.update(
      {
        name: name,
        type: type,
        size: size,
        speed: speed,
        channel: channel,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: memory.id,
        },
      }
    );
    res.status(200).json({ msg: "Memory Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMemory = async (req, res) => {
  const memory = await Memory.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!memory) return res.status(404).json({ msg: "Data Not Found" });
  try {
    await Memory.destroy({
      where: {
        id: memory.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfull" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
