const request = require('request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=2cba45ed4692e99f0a39e8eff2536b47&query=${lat},${long}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback("Cannot find the location", undefined)
        } else {
            const current_weather = body.current
            const curTemp = current_weather["temperature"]
            const curFeel = current_weather["feelslike"]
            callback(undefined, `${current_weather.weather_descriptions[0]}. It is currently ${curTemp} degrees out. It feels like ${curFeel} degrees out.`)
        }
    })
}

module.exports = forecast