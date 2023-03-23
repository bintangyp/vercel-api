import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import ProcessorRoute from "../routes/ProcessorRoute.js";
import MotherboardRoute from "../routes/MotherboardRoute.js";
import MemoryRoute from "../routes/MemoryRoute.js";
import StorageRoute from "../routes/StorageRoute.js";
import UserRoute from "../routes/UserRoute.js";
import AuthRoute from "../routes/AuthRoute.js";
import CassingRoute from "../routes/CassingRoute.js";
import VgaCardRoute from "../routes/VgaCardRoute.js";
import PsuRoute from "../routes/PsuRoute.js";
import MoreRoute from "../routes/MoreRoute.js";
import db from "../config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import TotalPriceRoute from "../routes/TotalPriceRoute.js";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

const secretsess =
  "ndsj789f7sdfkdjsfusdfy87fdsfgfge978gdifg8s7dfgsdf789dsftds7";

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: process.env.SESS_SECRET || secretsess,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://192.168.42.169:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://127.0.0.1:5500",
      "https://bintangyp.github.io",
    ],
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProcessorRoute);
app.use(MotherboardRoute);
app.use(MemoryRoute);
app.use(StorageRoute);
app.use(CassingRoute);
app.use(UserRoute);
app.use(AuthRoute);
app.use(VgaCardRoute);
app.use(PsuRoute);
app.use(MoreRoute);
app.use(TotalPriceRoute);

app.get("/", (req, res) => {
  res.send("Api Bekerja");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
