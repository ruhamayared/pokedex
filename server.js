require("dotenv").config()
const express = require('express')
const pokemon = require('./models/pokemon')
const methodOverride = require("method-override")

const app = express()


//Middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: pokemon });
    });
    
    
// SHOW
    app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { pokemon: pokemon[req.params.id] });
    });



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})