const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/info.json', (req, res) => {
    let info = {};
    fs.readFile(path.join(__dirname, 'public', 'info.json'), function(err, data) {
        if (err) throw err;
        info = JSON.parse(data);
        if (req.query.put == 'true')
        {
            info.hype_bar_clicks += 1;
            fs.writeFile(path.join(__dirname, 'public', 'info.json'), JSON.stringify(info), err => { if (err) throw err; });
        }
        res.json(info);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));