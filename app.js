import express from 'express';
import https from 'https'
import path from 'path'
import bodyParser from 'body-parser'
import {fileURLToPath} from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html")
    // console.log(__dirname);
})

app.post("/", (req, res) => {
    var query = req.body.cityName
    const apiKey = "b033ddcbc6344ea29ee651ad6389e957"
    const unit = "metric"
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

    https.get(urlWeather, (response)=>{
        // console.log(response.statusCode);
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<p>The weather is currently ${weatherDesc}</p>`)
            res.write(`<h1>The temperature is ${temp} OC.</H1>`)
            res.write(`<img src="${imgURL}">`)

            res.send()

            //JSON.stringify(obj) will make data become a flat packed string data
            // console.log(JSON.stringify(obj))
        })
    })
})


app.listen(3000, () => {
    console.log("Server is running on port: 3000");
})