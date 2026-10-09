import express from "express";
import router from "./router.js";
import bodyParser from "body-parser"


const app = express();
app.use (bodyParser.json())
app.use(router)

// app.get("/",(req,res) =>{
//     res.json ({message : "Halaman dashboard"})
// })
// app.get("/nama",(req,res) =>{
//     res.json ({message : "Hello Putra!"})
// })
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Application berjalan di port : ${PORT}`);
});