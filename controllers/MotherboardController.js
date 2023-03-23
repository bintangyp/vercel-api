import Motherboard from "../models/MotherboardModel.js";
import path from "path";
import fs from "fs";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getMotherboards = async (req, res) => {
  let response;
  try {
    response = await Motherboard.findAll({
      attributes: [
        "uuid",
        "motherboardName",
        "motherboardChipset",
        "motherboardVendor",
        "motherboardPrice",
        "motherboardImage",
        "motherboardUrl",
        "processorSocket",
        "memory",
        "memorySlot",
        "sataPort",
        "m2Slot",
        "lanPort",
        "usbPort",
        "display",
        "formFactor",
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMotherboard = async (req, res) => {
  try {
    const response = await Motherboard.findAll({
      where: {
        processorSocket: req.params.processorSocket,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMotherboardById = async (req, res) => {
  let response;
  try {
    const motherboard = await Motherboard.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!motherboard)
      return res.status(404).json({ msg: "Motherboard Not Found" });
    response = await Motherboard.findOne({
      attributes: [
        "uuid",
        "motherboardName",
        "motherboardChipset",
        "motherboardVendor",
        "motherboardPrice",
        "motherboardImage",
        "motherboardUrl",
        "processorSocket",
        "memory",
        "memorySlot",
        "sataPort",
        "m2Slot",
        "lanPort",
        "usbPort",
        "display",
        "formFactor",
      ],
      where: {
        id: motherboard.id,
      },
      order: [["id", "DESC"]],
      include: [{ model: Users, attributes: ["name", "email"] }],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMotherboard = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Motherboard.create({
        motherboardName: name,
        motherboardChipset: req.body.chipset,
        motherboardVendor: req.body.vendor,
        motherboardPrice: req.body.price,
        motherboardImage: fileName,
        motherboardUrl: url,
        processorSocket: req.body.socket,
        memory: req.body.memory,
        memorySlot: req.body.memorySlot,
        sataPort: req.body.sataPort,
        m2Slot: req.body.m2Slot,
        lanPort: req.body.lanPort,
        usbPort: req.body.usbPort,
        display: req.body.display,
        formFactor: req.body.formFactor,
      });
      res.status(201).json({ msg: "Motherboard Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMotherboard = async (req, res) => {
  const motherboard = await Motherboard.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!motherboard) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = motherboard.motherboardImage;
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

    const filePath = `./public/images/${motherboard.motherboardImage}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  let name = req.body.title;
  let vendor = req.body.vendor;
  let chipset = req.body.chipset;
  let socket = req.body.socket;
  let price = req.body.price;
  let memory = req.body.memory;
  let memorySlot = req.body.memorySlot;
  let sataPort = req.body.sataPort;
  let m2Slot = req.body.m2Slot;
  let usbPort = req.body.usbPort;
  let display = req.body.display;
  let formFactor = req.body.formFactor;
  let lanPort = req.body.lanPort;

  if (name === "") {
    name = motherboard.motherboardName;
  }
  if (vendor === "") {
    vendor = motherboard.motherboardVendor;
  }
  if (chipset === "") {
    chipset = motherboard.motherboardChipset;
  }
  if (socket === "") {
    socket = motherboard.motherboardSocket;
  }
  if (price === "") {
    price = motherboard.motherboardPrice;
  }
  if (memory === "") {
    memory = motherboard.memory;
  }
  if (memorySlot === "") {
    memorySlot = motherboard.memorySlot;
  }
  if (sataPort === "") {
    sataPort = motherboard.sataPort;
  }
  if (m2Slot === "") {
    m2Slot = motherboard.m2Slot;
  }
  if (usbPort === "") {
    usbPort = motherboard.usbPort;
  }
  if (display === "") {
    display = motherboard.display;
  }
  if (formFactor === "") {
    formFactor = motherboard.formFactor;
  }
  if (lanPort === "") {
    lanPort = motherboard.lanPort;
  }

  try {
    await Motherboard.update(
      {
        motherboardName: name,
        motherboardChipset: chipset,
        motherboardVendor: vendor,
        motherboardPrice: price,
        motherboardImage: fileName,
        motherboardUrl: url,
        processorSocket: socket,
        memory: memory,
        memorySlot: memorySlot,
        sataPort: sataPort,
        m2Slot: m2Slot,
        lanPort: lanPort,
        usbPort: usbPort,
        display: display,
        formFactor: formFactor,
      },
      {
        where: {
          id: motherboard.id,
        },
      }
    );
    res.status(200).json({ msg: "Motherboard Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMotherboard = async (req, res) => {
  const motherboard = await Motherboard.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!motherboard) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/${motherboard.motherboardImage}`;
    fs.unlinkSync(filePath);
    await Motherboard.destroy({
      where: {
        id: motherboard.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
