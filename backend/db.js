const mongoose = require("mongoose");

const url =
  "mongodb://admin:admin@ac-flqecim-shard-00-00.baxbqzz.mongodb.net:27017,ac-flqecim-shard-00-01.baxbqzz.mongodb.net:27017,ac-flqecim-shard-00-02.baxbqzz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-50vxz5-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url)
    .then((res) => console.log("Mongo DB connected Successfully"))
    .catch((err) => console.log("Error", err));
};
