const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
module.exports = {
  connect: async () => {
    try {
      const uri = "mongodb://localhost:27017/stockphotos";
      // const uri = "mongodb://dellyson:dellyson1@ds013848.mlab.com:13848/stockphotos";
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log("MongoDB connected sucessfully");
    } catch (err) {
      throw new err();
    }
  },
};
