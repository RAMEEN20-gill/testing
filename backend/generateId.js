const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log("Generated ObjectId:", id.toString());
