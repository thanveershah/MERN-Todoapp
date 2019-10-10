const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client/build"));
require("./db");

app.use("/", require("./routes/userdata"));

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Running in ${PORT}`));
