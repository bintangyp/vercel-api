import Cassing from "../models/CassingModel.js";
import path from "path";
import fs from "fs";

export const getCassing = async (req, res) => {
  try {
    const response = await Cassing.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getCasingByFormFactor = async (req, res) => {
  let formFactor = req.params.formFactor.toLowerCase();
  try {
    if (formFactor === "atx") {
      const response = await Cassing.findAll({
        where: {
          formFactor: req.params.formFactor,
        },
      });
      res.status(200).json(response);
    } else if (formFactor === "matx") {
      const response = await Cassing.findAll();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createCassing = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/cassing/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/cassing/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Cassing.create({
        name: name,
        vendor: req.body.vendor,
        formFactor: req.body.formFactor,
        frontPanel: req.body.frontPanel,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Cassing Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateCassing = async (req, res) => {
  const cassing = await Cassing.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!cassing) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = cassing.image;
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

    const filePath = `./public/images/cassing/${cassing.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/cassing/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/cassing/${fileName}`;
  let name = req.body.name;
  let vendor = req.body.vendor;
  let formFactor = req.body.formFactor;
  let frontPanel = req.body.frontPanel;
  let price = req.body.price;

  if (name === "" || name === null) {
    name = cassing.name;
  }
  if (vendor === "" || vendor === null) {
    vendor = cassing.vendor;
  }
  if (formFactor === "" || formFactor === null) {
    formFactor = cassing.formFactor;
  }
  if (frontPanel === "" || frontPanel === null) {
    frontPanel = cassing.frontPanel;
  }

  if (price === "") {
    price = cassing.price;
  }

  try {
    await Cassing.update(
      {
        name: name,
        vendor: vendor,
        formFactor: formFactor,
        frontPanel: frontPanel,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: cassing.id,
        },
      }
    );
    res.status(200).json({ msg: "Cassing Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCassing = async (req, res) => {
  const cassing = await Cassing.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!cassing) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/cassing/${cassing.image}`;
    fs.unlinkSync(filePath);
    await Cassing.destroy({
      where: {
        id: cassing.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfull" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
