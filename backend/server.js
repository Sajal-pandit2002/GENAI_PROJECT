import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();
import cunnectMongoDb from "./src/config/db.js";
const port = process.env.PORT || 5001;
cunnectMongoDb();
app.listen(port, () => {
  console.log(`server is http://localhost:${port}`);
});
