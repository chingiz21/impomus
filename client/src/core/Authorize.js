import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();

export class Authorize {

    login(req, res) {
        var scope = 'playlist-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-top-read user-follow-read';

        res.redirect('https://accounts.spotify.com/authorize?' + 
            qs.stringify({
                response_type: 'code',
                client_id: process.env.CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.REDIRECT_URI
            })
        )
    }

    requestAccessAndRequestTokens(req, res) {
        var code = req.query.code || null;

        if (state === null) {
            res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
        } else {
            var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
            };
        }
    }

    refreshAccessToken(req, res) {
        var refresh_token = req.query.refresh_token;

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
            form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
            }
        });
    }
}