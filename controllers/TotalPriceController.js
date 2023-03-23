import TotalPrice from "../models/TotalPriceModels.js";

export const getTotal = async (req, res) => {
  try {
    const response = await TotalPrice.findAll({
      attributes: ["id", "nama", "type", "price"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createTotal = async (req, res) => {
  const price = await TotalPrice.findOne({
    where: {
      type: req.params.type,
    },
  });
  if (!price) {
    try {
      await TotalPrice.create({
        nama: req.body.nama,
        type: req.params.type,
        price: req.body.price,
      });
      res.status(201).json({ msg: "created" });
    } catch (error) {
      res.status(400).json({ msg: error.message + "error 1" });
    }
  } else {
    try {
      await TotalPrice.update(
        {
          nama: req.body.nama,
          type: price.type,
          price: req.body.price,
        },
        {
          where: {
            type: price.type,
          },
        }
      );
      res.status(201).json({ msg: "updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message + "error 2" });
    }
  }
};

export const deleteAllTotal = async (req, res) => {
  try {
    await TotalPrice.destroy({
      where: {},
      truncate: true,
    });
    res.status(200).json({ msg: "delete success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteByType = async (req, res) => {
  const type = await TotalPrice.findOne({
    where: {
      type: req.params.type,
    },
  });

  if (!type) {
  } else {
    try {
      await TotalPrice.destroy({
        where: {
          type: req.params.type,
        },
      });
      res.status(200).json({ msg: "delete 1 success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};
