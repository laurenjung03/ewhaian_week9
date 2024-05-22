const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // form 데이터를 파싱하기 위해 추가

app.set("view engine", "hbs")
app.set("views", templatePath)


app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data])

    res.render("home")
})

app.post("/login", async (req, res) => {
    const user = await collection.findOne({ name: req.body.name, password: req.body.password });
    if (user) {
        res.render("home")
    } else {
        res.send("Invalid login credentials")
    }
})

app.listen(4000, () => {
    console.log("port connected");
})