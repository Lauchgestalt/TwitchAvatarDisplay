const app = require('express')();
const PORT = 8080;

app.get('/data', (req, res) => {
    res.status(200).send({
        state: 'idle',
    })
});

app.listen(PORT);

// http://localhost:8080/data