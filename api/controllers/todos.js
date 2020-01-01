const moment = require("moment");
const { isBoolean, pick } = require("lodash");

const { Todos } = require("./../models/todo");
const { ObjectID } = require("mongodb");

exports.createTodo = async (req, res, next) => {
  try {
    if (req.body.activity.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Your Activity is an Empty String"
      });
    }

    const todo = new Todos({
      activity: req.body.activity,
      creator: req.body.user.message._id
    });

    const docs = await todo.save();
    if (!docs) {
      throw Error();
    }
    if (docs.isDone === true) {
      docs.durationCreatedAt = moment(docs.CreatedAt).calendar();
      docs.durationDoneAt = moment(docs.isDoneDate).calendar();
      return res.status(200).json({
        status: 200,
        message: docs
      });
    }
    docs.durationCreatedAt = moment(docs.CreatedAt).calendar();
    res.status(200).json({
      status: 200,
      message: docs
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error while Creating Todo"
    });
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const docs = await Todos.find({
      isDeleted: false,
      creator: req.body.user.message._id
    }).sort({ $natural: -1 });
    if (!docs) {
      throw Error();
    }
    let modifiedDocs = docs.map(doc => {
      if (doc.isDone === true) {
        doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
        doc.durationDoneAt = moment(doc.isDoneDate).calendar();
        return doc;
      }
      doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
      return doc;
    });
    return res.status(200).json({
      status: 200,
      message: modifiedDocs
    });
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "No Todo found"
    });
  }
};

exports.getOneTodo = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Request Credentials"
      });
    }
    const doc = await Todos.findOne({
      _id: req.params.id,
      creator: req.body.user.message._id,
      isDeleted: false
    });

    if (!doc) {
      throw Error();
    }

    if (doc.isDone === true) {
      doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
      doc.durationDoneAt = moment(doc.isDoneDate).calendar();

      return res.status(200).json({
        status: 200,
        message: doc
      });
    } else {
      doc.durationCreatedAt = moment(doc.CreatedAt).calendar();

      return res.status(200).json({
        status: 200,
        message: doc
      });
    }
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "No Todo found"
    });
  }
};

exports.todoUpdate = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Request Credentials"
      });
    }

    const body = pick(req.body, ["activity", "isDone"]);
    if (body.isDone && isBoolean(body.isDone)) {
      body.isDoneDate = Date.now();
    } else {
      body.isDone = false;
      body.isDoneDate = null;
    }

    const doc = await Todos.findOneAndUpdate(
      {
        _id: req.params.id,
        creator: req.body.user.message._id,
        isDeleted: false
      },
      { $set: body },
      { new: true }
    );

    if (!doc) {
      throw Error();
    }

    if (doc.isDone === true) {
      doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
      doc.durationDoneAt = moment(doc.isDoneDate).calendar();
      return res.status(200).json({
        status: 200,
        message: doc
      });
    }
    doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
    return res.status(200).json({
      status: 200,
      message: doc
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: 404,
      message: "No Todo found or Todo has been deleted"
    });
  }
};

exports.todoDelete = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Request Credentials"
      });
    }
    const doc = await Todos.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
        creator: req.body.user.message._id
      },
      {
        $set: {
          isDeleted: true
        }
      },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({
        status: 404,
        message: "No Todo Found"
      });
    }

    if (doc.isDone === true) {
      doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
      doc.durationDoneAt = moment(doc.isDoneDate).calendar();
      return res.status(200).json({
        status: 200,
        message: doc
      });
    }
    doc.durationCreatedAt = moment(doc.CreatedAt).calendar();
    return res.status(200).json({
      status: 200,
      message: doc
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error while Deleting Todo"
    });
  }
};
