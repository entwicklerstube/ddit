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
app.post('/inputRoteKarten', function (req, res) {
    var gelbeKarte = req.body;
    console.log(gelbeKarte);
    res.status(200).send('Eintrag erfolgreich hinzugefügt');
});

app.post('/inputGelbeKarten', urlencodedParser, function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});

app.post('/inputTor', function (req, res) {
    var gelbeKarte = req.body;
    console.log(gelbeKarte);
    res.status(200).send('Eintrag erfolgreich hinzugefügt');
});

app.post('/inputVerschossen', function (req, res) {
    var gelbeKarte = req.body;
    console.log(gelbeKarte);
    res.sendStatus(200).send('Eintrag erfolgreich hinzugefügt');
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


});
