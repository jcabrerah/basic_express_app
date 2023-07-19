const express = require('express');
const http = require('http')
const client = require('prom-client')
const app = express();

const register = new client.Registry();

register.setDefaultLabels({
    app: 'basic_express_app'
})

client.collectDefaultMetrics({ register })

app.get('/', (req, res) => {
    res.send('Hello world good word');    
});

app.get('/metrics', (req, res) => {
    res.setHeader('Content-type', register.contentType);
    res.send(register.metrics())
})

app.listen(8080, () => {
    console.log('Express web app on localhost');
})

