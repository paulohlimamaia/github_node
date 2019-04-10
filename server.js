const express        = require('express');
const bodyParser     = require('body-parser');
const https = require('https')
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.get('/api/users/:since?', function(req, res){
  if(req.params.since){

    var options = {
        host: 'api.github.com',
        path: `/users?since=${req.params.since}`,
        headers: {
            'User-Agent': 'paulohlimamaia'
        }
    };

    const request = https.get(options, (response) => {
        var body = ''

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            body = JSON.parse(body)

            if(response.headers.link){
                var ini = response.headers.link.indexOf('<') + 1
                var end = response.headers.link.indexOf('>')
                var nextPage = response.headers.link.slice(ini, end)
                body.push({"next_page": nextPage})
            }

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(body)
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
  } else {

    var options = {
        host: 'api.github.com',
        path: '/users',
        headers: {
            'User-Agent': 'paulohlimamaia',
        }
    };

    const request = https.get(options, (response) => {
        var body = ''

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            body = JSON.parse(body)

            if(response.headers.link){
                var ini = response.headers.link.indexOf('<') + 1
                var end = response.headers.link.indexOf('>')
                var nextPage = response.headers.link.slice(ini, end)
                body.push({"next_page": nextPage})
            }

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(body)
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
  }
});

app.get('/api/users/:username/details', function(req, res){
    var options = {
        host: 'api.github.com',
        path: `/users/${req.params.username}`,
        headers: {
            'User-Agent': 'paulohlimamaia',
        }
    };

    const request = https.get(options, (response) => {
        var body = ''

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(JSON.parse(body))
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

app.get('/api/users/:username/repos', function(req, res){
    var options = {
        host: 'api.github.com',
        path: `/users/${req.params.username}/repos`,
        headers: {
            'User-Agent': 'paulohlimamaia',
        }
    };

    const request = https.get(options, (response) => {
        var body = ''

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            body = JSON.parse(body)

            if(response.headers.link){
                var ini = response.headers.link.indexOf('<') + 1
                var end = response.headers.link.indexOf('>')
                var nextPage = response.headers.link.slice(ini, end)
                body.push({"next_page": nextPage})
            }

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(body)
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});



// Port Listener
app.listen(port, () => {
    console.log('Listening on port ' + port)
});