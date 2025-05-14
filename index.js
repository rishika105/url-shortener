import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import urlRoutes from "./routes/url.route.js";
import path from "path";
import URL from "./models/url.model.js";
import staticRoutes from "./routes/staticRouter.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

//db connect
dbConnect();

//server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
//form data support
app.use(express.urlencoded({extended: false}))

app.use(express.static('views'));

//allow all origin
app.use(cors());

//define routes
app.use("/api/url", urlRoutes);
app.use("/", staticRoutes);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

//run server on route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

//start the server and listen on this port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
