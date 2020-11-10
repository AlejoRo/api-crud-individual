const express = require("express")
const path = require("path")
const morgan = require("morgan")
const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use("/api/", require("./routes/toppings"))

app.get("/", (req, res) => {
  res.send("Api pizza")
})

app.set("puerto", 6060)

app.listen(app.get("puerto"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`)
})