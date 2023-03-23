import ProcessorList from "../models/ProcessorListModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getProcessorLists = async (req, res) => {
  let response;
  try {
    if (req.role === "admin") {
      response = await ProcessorList.findAll({
        attributes: [
          "uuid",
          "processorFullName",
          "processorVendor",
          "processorType",
          "processorSocket",
          "processorGen",
          "price",
        ],
        order: [["id", "DESC"]],
        include: [{ model: Users, attributes: ["name", "email"] }],
      });
    } else {
      response = await ProcessorList.findAll({
        attributes: [
          "uuid",
          "processorFullName",
          "processorVendor",
          "processorType",
          "processorSocket",
          "processorGen",
          "price",
        ],
        where: {
          userId: req.userId,
        },
        order: [["id", "DESC"]],
        include: [{ model: Users, attributes: ["name", "email"] }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getProcessorByType = async (req, res) => {
  try {
    const response = await ProcessorList.findAll({
      where: {
        processorType: req.params.processorType,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProcessorList = async (req, res) => {
  try {
    await ProcessorList.create({
      processorFullName: req.body.title,
      processorVendor: req.body.vendor,
      processorType: req.body.type,
      processorSocket: req.body.socket,
      processorGen: req.body.gen,
      price: req.body.price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Processor List Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProcessorList = async (req, res) => {
  const processor = await ProcessorList.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!processor) return res.status(404).json({ msg: "Data Not Found" });
  let name = req.body.title;
  let vendor = req.body.vendor;
  let type = req.body.type;
  let socket = req.body.socket;
  let gen = req.body.gen;
  let price = req.body.price;

  if (name === "" || name === null) {
    name = processor.processorFullName;
  }
  if (vendor === "" || vendor === null) {
    vendor = processor.processorVendor;
  }
  if (type === "" || type === null) {
    type = processor.processorType;
  }
  if (socket === "" || socket === null) {
    socket = processor.processorSocket;
  }
  if (gen === "" || gen === null) {
    gen = processor.processorGen;
  }
  if (price === "" || price === null) {
    price = processor.price;
  }

  try {
    if (req.role === "admin") {
      await ProcessorList.update(
        {
          processorFullName: name,
          processorVendor: vendor,
          processorType: type,
          processorSocket: socket,
          processorGen: gen,
          price: price,
        },
        {
          where: {
            id: processor.id,
          },
        }
      );
    } else {
      await ProcessorList.update(
        {
          processorFullName: name,
          processorVendor: vendor,
          processorType: type,
          processorSocket: socket,
          processorGen: gen,
          price: price,
        },
        {
          where: {
            [Op.and]: [{ id: processor.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Update successfull" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProcessorList = async (req, res) => {
  const processor = await ProcessorList.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!processor) return res.status(404).json({ msg: "Data Not Found" });
  try {
    if (req.role === "admin") {
      await ProcessorList.destroy({
        where: {
          id: processor.id,
        },
      });
    } else {
      await ProcessorList.destroy({
        where: {
          [Op.and]: [{ id: processor.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Delete Successfull" });
  } catch (error) {
    console.log(error.message);
  }
};
