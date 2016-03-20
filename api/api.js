var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, { path: '/ws' });
var r = require('rethinkdb');
var md5 = require('md5');

/* CONFIG */
var wettercom_user = "7hack";
var wettercom_pw = "hacktheweather";


// start the server
console.log('Server started!');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
app.use(jsonParser);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connection = null;

r.connect({ host: 'localhost', port: 28015}, function(err, conn) {
    // Can't connect to Server
    if (err) throw err;

    connection = conn;

    // Create Datebase for first init
    r.dbCreate('ddtv').run(connection, function(err) {});

    // Map db to connection
    connection.use('ddtv');

    r.tableList().run(connection, function (err, list) {
        if (err) throw err;
        checkTable(list, "gelbeKarte");
        checkTable(list, "roteKarte");
        checkTable(list, "tor");
        checkTable(list, "verschossen");
        checkTable(list, "einwurf");
        checkTable(list, "freistoss");
        checkTable(list, "ecke");
        checkTable(list, "abseits");
    });

    // Check if table exists
    function checkTable(list, tablename){
        if (list.indexOf(tablename) == -1) {
            r.tableCreate(tablename).run(conn, function(err, result) {
                if (err) throw err;
                console.log('created table ', tablename);
            });
        } else {
            // For testing:
            // Delete all Entries on startup
            r.table(tablename).delete().run(conn, function(){
                console.log('deleted all entries in ', tablename);
            });
        }
    }
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
     **/
    var gelbeKarte = req.body;

    if(gelbeKarte){
        console.log("Gelbe Karte: " + gelbeKarte);

        r.table("gelbeKarte").insert(gelbeKarte).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

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
        console.log("Rote Karte " + roteKarte);
        r.table("roteKarte").insert(gelbeKarte).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputTor', function (req, res) {
    var tor = req.body;
    if(tor){
        console.log("Tor: " + tor);
        r.table("tor").insert(tor).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputVerschossen', function (req, res) {
    var verschossen = req.body;
    if(verschossen){
        console.log("Verschossen:" + verschossen);
        r.table("verschossen").insert(verschossen).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputEinwurf', urlencodedParser, function (req, res) {
    var einwurf = req.body;
    if(einwurf){
        console.log("Einwurf: " + einwurf);
        r.table("einwurf").insert(einwurf).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputFreistoss', urlencodedParser, function (req, res) {
    var freistoss = req.body;
    if(freistoss){
        console.log("Freistoss: " + freistoss);
        r.table("freistoss").insert(freistoss).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputEcke', urlencodedParser, function (req, res) {
    var ecke = req.body;
    if(ecke){
        console.log("Ecke: " + ecke);
        r.table("ecke").insert(ecke).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });

    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

app.post('/inputAbseits', urlencodedParser, function (req, res) {
    var abseits = req.body;
    if(abseits){
        console.log("Abseits: " + abseits);
        r.table("abseits").insert(abseits).run(connection, function(){
            res.status(200).send('Eintrag erfolgreich hinzugefügt');
        });
    } else {
        res.status(400).send('Error. Konnte nicht hinzugefügt werden');
    }
});

/* END SPORTSRADAR */

io.on('connection', function (socket) {
    /* WETTER.COM */

    socket.on("getWeatherToCity", function(data) {

        /* 7hackhacktheweathermunich */

        $url = "http://rwds2.wetter.com/location/index/search/"+data.cityname+"/user/"+wettercom_user+"/cs/"+md5(wettercom_user + wettercom_pw + data.cityname.toLowerCase());
        console.log($url);

        io.emit('pushWeatherFromCity');
    });

    /* ENDE WETTER.COM */

    // Zeigt Gelbe Karte in UI
    socket.on("getYellowCardsToGame", function(){
      console.log('asd');
        io.emit("pushYellowCardsToGame");
    });

    // Zeigt Wetter in der UI an
    socket.on("getAbseitsToGame", function(){
        io.emit("pushAbseitsToGame");
    });

    // Zeigt Tor Animation an
    socket.on("getTorToGame", function(){
        io.emit("pushTorToGame");
    });


    // Zeigt racer animation an
    socket.on("getEinwuerfeToGame", function(){
      io.emit("pushEinwuerfeToGame");
    });



    socket.on("getRedCardsToGame", function(){
        io.emit("pushRedCardsToGame");
    });


    socket.on("getVerschossenToGame", function(){
        io.emit("pushVerschossenToGame");
    });


    socket.on("getFreistoesseToGame", function(){
        io.emit("pushFreistoesseToGame");
    });

    socket.on("getEckenToGame", function(){
        io.emit("pushEckenToGame");
    });



    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }




    var positions = [];

    for(i = 0; i < 1000; i++) {
        var position = {};
        position.x = getRandomInt(0,100);
        position.y = getRandomInt(0,50);
        positions.push(position);
    }

    /*
    setInterval(function(){
        var act_position = positions[getRandomInt(0,1000)];
        console.log(act_position);
    }, 200);
    */


    /* FOOTBALL TRACKER */
    socket.on("new-football-tracker", function(data) {

    });

});
