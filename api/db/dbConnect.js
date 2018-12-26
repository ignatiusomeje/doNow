const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UpgradedTodo', { useNewUrlParser: true });

module.exports = {mongoose};