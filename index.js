const express = require('express');
const prometheus = require('prom-client')
const app = express();

const register = new prometheus.Registry();

register.setDefaultLabels({
    app: 'basic_express_app'
})

prometheus.collectDefaultMetrics({ 
    // app: 'basic_express_aap',
    // prefix: 'node_',
    // timeout: 10000,
    // gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
})

const httpRequestTimer = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    // buckets for response time from 0.1ms to 1s
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
});

register.registerMetric(httpRequestTimer);


app.get('/', (req, res) => {
    res.send('Hello world good word');    
});

app.get('/test', (req, res) => {
    const start = Date.now();
    try {
        res.send('Hello test'); 
    } catch (err) {
        res.send(err.message);
    } finally {
        const responseTimeInMs = Date.now() - start;
        httpRequestTimer.labels(req.method, req.route.path, res.statusCode.toString()).observe(responseTimeInMs);
    }
       
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
})

app.listen(3080, () => {
    console.log('Express web app on localhost');
})

