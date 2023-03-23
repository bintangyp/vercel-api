import path from "path";
import fs from "fs";
import Monitor from "../models/Tambahan/MonitorModels.js";

export const getMonitor = async (req, res) => {
  try {
    const response = await Monitor.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMonitorById = async (req, res) => {
  try {
    const response = await Monitor.findOne({
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

export const createMonitor = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const random = (Math.random() * 9999).toFixed();
  const fileName = file.md5 + random + ext;
  const url = `${req.protocol}://${req.get("host")}/images/monitor/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json("Infalid Image");
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5MB" });

  file.mv(`./public/images/monitor/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Monitor.create({
        name: name,
        brand: req.body.brand,
        panel: req.body.panel,
        resolusi: req.body.resolusi,
        port: req.body.port,
        price: req.body.price,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Monitor Created" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMonitor = async (req, res) => {
  const monitor = await Monitor.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!monitor) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = monitor.image;
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

    const filePath = `./public/images/monitor/${monitor.image}`;
    if (filePath !== "./public/images/planet.png") {
      fs.unlinkSync(filePath);
    }
    file.mv(`./public/images/monitor/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  let url = `${req.protocol}://${req.get("host")}/images/monitor/${fileName}`;
  let name = req.body.title;
  let brand = req.body.vendor;
  let panel = req.body.panel;
  let resolusi = req.body.resolusi;
  let port = req.body.port;
  let price = req.body.price;

  if (name === "") {
    name = monitor.name;
  }
  if (brand === "") {
    brand = monitor.brand;
  }
  if (panel === "") {
    panel = monitor.panel;
  }
  if (resolusi === "") {
    resolusi = monitor.resolusi;
  }
  if (port === "") {
    port = monitor.port;
  }
  if (price === "") {
    price = monitor.price;
  }

  try {
    await Monitor.update(
      {
        name: name,
        brand: brand,
        panel: panel,
        resolusi: resolusi,
        port: port,
        price: price,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: monitor.id,
        },
      }
    );
    res.status(200).json({ msg: "Monitor Update Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMonitor = async (req, res) => {
  const monitor = await Monitor.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!monitor) return res.status(404).json({ msg: "Data Not Found" });

  try {
    const filePath = `./public/images/monitor/${monitor.image}`;
    fs.unlinkSync(filePath);
    await Monitor.destroy({
      where: {
        id: monitor.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
