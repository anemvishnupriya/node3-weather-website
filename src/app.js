const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths to express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Vishnu Priya'
    })

})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About me',
        name:'Vishnu Priya'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'any help',
        name:'Vishnu priya'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide a address term'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send ({
                forecast: forecastData,
                loacation,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=> {
    res.render('404',{
        title: '404',
        name: 'vishnu priya',
        errorMessage:'help'

    })

})


app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'vishnu priya',
        errorMessage:'page not found'
    })
})

app.listen(3000, () => {
    console.log('server is on port 3000.')

})


