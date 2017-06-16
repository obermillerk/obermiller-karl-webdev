const q = require('q');
const app = require('../../express').projectRouter;
const https = require('https');
const querystring = require('querystring');
const btoa = require('btoa');

app.post('/rest/spotify/token', requestToken);
var clientId = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

function requestToken(req, res) {
    // var code = req.body.code;
    // var callback = req.body.cb;

    var host = "accounts.spotify.com";
    var path = "/api/token";
    var bodyData = {
        grant_type: "client_credentials"
    };

    var body = querystring.stringify(bodyData);

    var encoded = "Basic " + btoa(clientId + ':' + clientSecret);
    var head = {
        'Authorization': encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var options = {
        method: 'POST',
        host: host,
        headers: head,
        path: path
    };

    fetchToken(options, body).then(function(data) {
        res.json(data);
    });
}

function fetchToken(options, body) {
    var deferred = q.defer();
    const myReq = https.request(options, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({ error: e });
            }
        });
    });

    myReq.on('error', function(e) {
        deferred.reject({ error: e });
    });

    myReq.write(body);

    myReq.end();

    return deferred.promise;
}