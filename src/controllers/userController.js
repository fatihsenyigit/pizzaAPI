"use strict";

const User = require("../models/userModel");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(User),
      data,
    });
  },

  create: async (req, res) => {

    // if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
    //     req?.body?.password,
    //   )
    // ) {
    //   res.errorStatusCode = 404;
    //   throw new Error(
    //     "Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character",
    //   );
    //   //   const customError = new Error("");
    //   //   error.statusCode = 404;
    //   //   throw customError;
    // }

    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(200).send({
        error: false,
        data,
        new: await User.findOne({_id: req.params.id})
    })
  },

  delete: async(req, res) => {
    const data = await User.deleteOne({_id:req.params.id})
    res.status(data.deletedCount? 204 : 404).send({
        error: !data.deletedCount,
        data
    })
  }
};
