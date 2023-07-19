const express = require('express');
const prometheus = require('prom-client')
const app = express();

const register = new prometheus.Registry();

// register.setDefaultLabels({
//     app: 'basic_express_app'
// })

prometheus.collectDefaultMetrics({ 
    app: 'basic_express_aap',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
})

app.get('/', (req, res) => {
    res.send('Hello world good word');    
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
})

app.listen(3080, () => {
    console.log('Express web app on localhost');
})

