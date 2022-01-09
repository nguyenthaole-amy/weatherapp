const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000

//define path
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//set up handle bars engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    //render the template
    res.render('index', {
        title: 'Weather App',
        name: 'MI'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'MI'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'MI',
        mess: 'I can help you with everything you need'
    })
})

//get(route, func(what to send back))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('pnf', {
        title: '404',
        errormess: 'Help Article Not Found',
        name: 'MI'
    })
})

app.get('*', (req, res) => {
    res.render('pnf', {
        title: '404',
        name: 'MI',
        errormess: 'Page Not Found'
    })
})

//app.com 
//app.com/help
//app.com/about

//start the server
app.listen(port, () => {
    console.log('Server is up on port', port)
})