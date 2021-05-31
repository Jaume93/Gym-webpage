const express = require('express');
const app = express();
const fs = require('fs')

console.log('Adios')

app.get('/', (req, res) => {
    return res.send({
        success: true,
        message: "You rock!"
    });
});

app.post('createMember', (req, res) => {
    let obj {
        name = "Jaume",
        surname = "Cordoba"
    };

    fs.writeFile('')
});


app.listen(5000, () => console.log('Now listening for requests on port 5000'))