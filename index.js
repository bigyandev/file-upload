const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")

//middleware
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static("uploads"))
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname + "/views"))

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        return cb(null, "./uploads")
    },
    filename: function(req,file,cb) {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage})

app.get("/", (req,res) => {
    
    res.render("home")
})

app.post("/upload", upload.single("fileImage"), (req,res) => {
    res.render("home", {
        img: req.file.filename
    })
    console.log(req.file)
   
})

app.listen(8080)