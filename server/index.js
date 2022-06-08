const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/api/users/:id/update", (req, res) => {
  console.log(req.body);
  setTimeout(() => {
    res.send(req.body);
  }, [2000]);
});

app.delete("/api/users/:id", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
