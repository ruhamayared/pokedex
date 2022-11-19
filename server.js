require("dotenv").config()
const express = require('express')
const pokemon = require('./models/pokemon')
const methodOverride = require("method-override")

const app = express()


//Middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

//INDEX ROUTE - GET - Return all pokemon
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: pokemon })
    })

//NEW ROUTE - GET - Render a page with a form to create a new pokemon
app.get('/pokemon/new', (req, res) => {
    res.render("new.ejs")
})

//DESTROY Route - DELETE - Delete pokemon
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon")
})

//UPDATE ROUTE - PUT - Receive the data from the EDIT ROUTE form and update a pokemon, then redirect the user back to index
app.put('/pokemon/:id', (req, res) => {
    //updating pokemon
    pokemon[req.params.id] = req.body
    res.redirect("/pokemon")
})

//CREATE ROUTE - POST - Receive the data from the NEW ROUTE form and create a new pokemon, then redirect the user back to index
app.post('/pokemon', (req, res) => {
    pokemon.unshift(req.body)
    //console.log(req.body)
    res.redirect("/pokemon")
})

//EDIT ROUTE - GET - Render a page with a form to edit a pokemon
app.get('/pokemon/:id/edit', (req, res) =>{
    //render edit.ejs with the existing pokemon data
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    })
})

//SHOW ROUTE - GET - Returns a single pokemon
    app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.id],
        index: req.params.id
    })
    });


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})