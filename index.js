const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world good word');    
});
app.listen(3000, () => {
    console.log('Express web app on localhost');
})