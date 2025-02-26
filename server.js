const express = require("express");
const app = express();

app.use(express.static(__dirname)); // Phục vụ file tĩnh

app.listen(3000, () => {
  console.log("Server chạy tại: http://localhost:3000");
});
