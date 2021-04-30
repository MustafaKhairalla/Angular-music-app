const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releaseDate: { type: String, required: true },
    price: { type: Number, required: true },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
