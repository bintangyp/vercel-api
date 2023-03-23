import path from "path";
import fs from "fs";
import VgaCard from "../models/VgaCardModels.js";

export const getVga = async (req, res) => {
  try {
    const response = await VgaCard.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getVgaById = async (req, res) => {
  try {
    const response = await VgaCard.findOne({
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

export const createVgaCard = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/vgaCard/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/vgaCard/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await VgaCard.create({
        name: name,
        brand: req.body.vendor,
        memoryType: req.body.type,
        memorySize: req.body.size,
        reqPsu: req.body.reqPsu,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Vga Card Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateVgaCard = async (req, res) => {
  const vgaCard = await VgaCard.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!vgaCard) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = vgaCard.image;
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

    const filePath = `./public/images/vgaCard/${vgaCard.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/vgaCard/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/vgaCard/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let memoryType = req.body.type;
  let memorySize = req.body.size;
  let reqPsu = req.body.reqPsu;
  let price = req.body.price;

  if (name === "") {
    name = vgaCard.name;
  }
  if (brand === "") {
    brand = vgaCard.brand;
  }

  if (memoryType === "") {
    memoryType = vgaCard.memoryType;
  }
  if (memorySize === "") {
    memorySize = vgaCard.memorySize;
  }
  if (reqPsu === "") {
    reqPsu = vgaCard.reqPsu;
  }
  if (price === "") {
    price = vgaCard.price;
  }

  try {
    await VgaCard.update(
      {
        name: name,
        brand: brand,
        memoryType: memoryType,
        memorySize: memorySize,
        reqPsu: reqPsu,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: vgaCard.id,
        },
      }
    );
    res.status(200).json({ msg: "Vga Card Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteVgaCard = async (req, res) => {
  const vgaCard = await VgaCard.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!vgaCard) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/vgaCard/${vgaCard.image}`;
    fs.unlinkSync(filePath);
    await VgaCard.destroy({
      where: {
        id: vgaCard.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
