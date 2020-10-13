const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
module.exports = {
  connect: async () => {
    try {
      const uri = "";
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
