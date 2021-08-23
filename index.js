require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  require("./db/db")
    .then(() => {
      console.log("Connected to the database");
      console.log(`Listening on port ${PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
