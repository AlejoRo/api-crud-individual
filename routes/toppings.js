const {Router}= require('express')
const router = Router()
const fs = require('fs')
const FileToppings = fs.readFileSync('./toppings.json', 'utf-8')
const JSONToppings = JSON.parse(FileToppings)

router.get("/", (req, res) => {
  res.send("API pizzas locas")
})

router.get("/toppings", (req, res) => {
  res.json(JSONToppings)
})

router.post("/toppings", (req, res)=>{
  let id = JSONToppings.length + 1
  let {base, queso, topping} = req.body
  let nuevaPizza ={
    "id": id,
    "base": base,
    "queso": queso,
    "topping": topping
  }
  JSONToppings.push(nuevaPizza)
  fs.writeFileSync('./toppings.json', JSON
  .stringify(JSONToppings), 'utf-8')
  console.log(JSONToppings)
  res.status(300).json(nuevaPizza)
})

router.get('/toppings/:id', (req, res)=>{
  let id = req.params.id
  let pizzaEncontrada = JSONToppings.find
  (toppings => toppings.id == id)

  if(pizzaEncontrada !=  undefined)
  res.status(301).json(pizzaEncontrada)
  else
  res.json(`oleeeeee, tu pizza ID ${id} no existe, animal`)
})

router.put("/toppings/:id", (req, res)=>{
  let id = req.params.id
  let {base, queso, topping} = req.body
  let pizzaModificada = JSONToppings.find(toppings =>{
    if (toppings.id == id){
      toppings.base = base
      toppings.queso = queso
      toppings.topping = topping
      return topping
    }
  })
  if(pizzaModificada != undefined){
    res.status(303).json(pizzaModificada)}
    else{
      res.json(`Su pizza ID ${id} no existe ome`)
    }
})

router.delete("/toppings/:id", (req, res)=>{
  let id = req.params.id
  let indexPizza = JSONToppings.findIndex(toppings => toppings.id == id)
  if(indexPizza != -1){
    JSONToppings.splice(indexPizza, 1)
    fs.writeFileSync('./toppings.json', JSON.stringify(JSONToppings), 'utf-8')
    res.status(999).json({mensaje : `te acabas de comer la pizza ${id} boludo`})
  }else{
    res.json(`Esa pizza ID ${id} nunca existió`)
  }
})

module.exports = router