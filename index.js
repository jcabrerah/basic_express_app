const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world good word');    
});
app.listen(8080, () => {
    console.log('Express web app on localhost');
})