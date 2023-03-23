import Processor from "../models/ProcessorModel.js";
import path from "path";
import fs from "fs";

export const getProcessors = async (req, res) => {
  try {
    const response = await Processor.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProcessorById = async (req, res) => {
  try {
    const response = await Processor.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProcessorByVendor = async (req, res) => {
  try {
    const response = await Processor.findAll({
      where: {
        vendor: req.params.vendor,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProcessor = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }
  const name = req.body.name;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/vendor/${fileName}`;
  const allowType = [".png", "jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Infalid Images" });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({ msg: "File must be less than 5Mb" });
  }
  file.mv(`./public/images/vendor/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }
  });

  try {
    await Processor.create({
      name: name,
      vendor: req.body.vendor,
      type: req.body.type,
      image: fileName,
      url: url,
    });
    res.status(201).json({ msg: "Processor Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProcessor = async (req, res) => {
  const processor = await Processor.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!processor) {
    return res.status(404).json({ msg: "Processor Not Found" });
  }
  let fileName;

  if (req.files === null) {
    fileName = processor.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const random = (Math.random() * 9999).toFixed();
    fileName = file.md5 + random + ext;

    const allowType = [".png", "jpg", ".jpeg"];

    if (!allowType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Infalid Images" });
    }
    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "File must be less than 5Mb" });
    }
    const filePath = `./public/images/vendor/${processor.image}`;
    fs.unlinkSync(filePath);
    file.mv(`./public/images/vendor/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/vendor/${fileName}`;
  let name = req.body.name;
  let vendor = req.body.vendor;
  let type = req.body.type;

  if (name === "" || name === null) {
    name = processor.name;
  }
  if (type === "" || type === null) {
    type = processor.type;
  }
  if (vendor === "" || vendor === null) {
    vendor = processor.vendor;
  }

  try {
    await Processor.update(
      {
        name: name,
        vendor: vendor,
        type: type,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Successfull" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProcessor = async (req, res) => {
  try {
    await Processor.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfull" });
  } catch (error) {
    console.log(error.message);
  }
};
