var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var r = require('rethinkdb');

// start the server
console.log('Server started!');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
app.use(jsonParser);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


/* START SPORTSRADAR */

app.post('/inputGelbeKarten', urlencodedParser, function (req, res) {
    /*
     * var testreq = { time: '90',
     team: 'B. Munich',
     team_img: 'http://ls.betradar.com/ls/crest/big/2672.png'
     }
     * */

    var gelbeKarte = req.body;
    if(gelbeKarte){
        console.log(gelbeKarte);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputRoteKarten', urlencodedParser, function (req, res) {
    /*
     * var testreq = { time: '90',
     team: 'B. Munich',
     team_img: 'http://ls.betradar.com/ls/crest/big/2672.png'
     }
     * */

    var roteKarte = req.body;
    if(roteKarte){
        console.log(roteKarte);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputTor', function (req, res) {
    var tor = req.body;
    if(tor){
        console.log(tor);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputVerschossen', function (req, res) {
    var verschossen = req.body;
    if(verschossen){
        console.log(verschossen);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputEinwurf', urlencodedParser, function (req, res) {
    var einwurf = req.body;
    if(einwurf){
        console.log(einwurf);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputFreistoss', urlencodedParser, function (req, res) {
    var freistoss = req.body;
    if(freistoss){
        console.log(freistoss);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputEcke', urlencodedParser, function (req, res) {
    var ecke = req.body;
    if(ecke){
        console.log(ecke);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputAbseits', urlencodedParser, function (req, res) {
    var abseits = req.body;
    if(abseits){
        console.log(abseits);
        res.status(200).send('Eintrag erfolgreich hinzugefügt');
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

/* END SPORTSRADAR */

io.on('connection', function (socket) {
    /* WETTER.COM */

    /* ENDE WETTER.COM */

    socket.on("getYellowCardsToGame", function(){

    });

    socket.on("getRedCardsToGame", function(){

    });

    socket.on("getCornersToTeam", function(){

    });

    socket.on("getWeatherToCity", function(data) {
       $url = "http://rwds2.wetter.com/location/index/search/"+data.cityname+"/user/7hack/cs/bf5860dd97b8582b194f2230fa43efd9/"

    });

});
