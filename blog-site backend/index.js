const connectToMongo = require("./db")
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

dotenv.config()
connectToMongo()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))


app.use(cors({
  origin:"http://localhost:3000"
}))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use('/api/auth',require('./routes/auth'))
app.use('/api/post',require('./routes/post'))
app.use('/api/categorie',require('./routes/categorie'))

app.listen(process.env.PORT, () => {
  console.log(`Backend is running`)
})