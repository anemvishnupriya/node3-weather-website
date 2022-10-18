const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b46ca483d780977cd8f2f65410e9fc6a&query= ' + latitude + ',' + longitude + '&units=f'

request ({url : url , json: true}, (error , response) => {
    if (error) {
        callback('unable to connect to location services!', undefined)
    } else if (response.body.error) {
        callback('unable to find location',undefined)
    }else {
    console.log(undefined,'the temperature: ' + response.body.current.temperature + ' the feels like temperature: ' + response.body.current.feelslike)
    }
})


}

module.exports = forecast