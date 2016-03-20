var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var r = require('rethinkdb');
var md5 = require('md5');
var http = require('http');
var request = require('request');

/* CONFIG */
var wettercom_user = "7hack";
var wettercom_pw = "hacktheweather";

var ericsson_api_key = "240e4458fc4c6ac85c290481646b21ef";
var ericsson_url = "http://hack.api.uat.ebmsctogroup.com";

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

function getRequestTo(path, callback) {
    return request(ericsson_url + path, function(error, response, body) {
        callback(error, response, body);
    });
}

io.on('connection', function (socket) {
    /* WETTER.COM */

    socket.on("getWeatherToCity", function(data) {

        /* 7hackhacktheweathermunich */

        $url = "http://rwds2.wetter.com/location/index/search/"+data.cityname+"/user/"+wettercom_user+"/cs/"+md5(wettercom_user + wettercom_pw + data.cityname.toLowerCase());
        console.log($url);

        io.emit('pushWeatherFromCity');
    });

    /* ENDE WETTER.COM */


    socket.on("getYellowCardsToGame", function(){
        io.emit("pushYellowCardsToGame");
    });

    socket.on("getRedCardsToGame", function(){
        io.emit("pushRedCardsToGame");
    });

    socket.on("getTorToGame", function(){
        io.emit("pushTorToGame");
    });

    socket.on("getVerschossenToGame", function(){
        io.emit("pushVerschossenToGame");
    });

    socket.on("getEinwuerfeToGame", function(){
        io.emit("pushEinwuerfeToGame");
    });

    socket.on("getFreistoesseToGame", function(){
        io.emit("pushFreistoesseToGame");
    });

    socket.on("getEckenToGame", function(){
        io.emit("pushEckenToGame");
    });

    socket.on("getAbseitsToGame", function(){
        io.emit("pushAbseitsToGame");
    });


    /* START ERICSSON */

    socket.on("getAllChannels", function(){

        getRequestTo("/stores-active/source/filter?numberOfResults=1000", function(error, response, body){
            console.log(response);
            io.emit("pushAllChannels", response);
        });
    });


    socket.on("getProgramToChannelByTime", function(data){
        data.timeFrom = "2016-03-19T18:00:00Z";
        data.timeTo = "2016-03-19T21:00:00Z";
        data.programmName = 'ProSieben';
        path = '/stores-active/contentInstance/event/filter?numberOfResults=100&' +
            'filter={"criteria":[' +
            '{"term":"publishedStartDateTime","operator":"atLeast","value":"'+data.timeFrom+'"},' +
            '{"term":"publishedStartDateTime","operator":"atMost","value":"'+data.timeTo+'"},' +
            '{"term":"sourceName","operator":"in","values":["'+data.programmName+'"]}],"operator":"and"}' +
            '&api_key='+ericsson_api_key;

        getRequestTo(path, function(error, response, body){
            console.log(response);
            io.emit("pushAllChannels", response);
        });



    });

    socket.on("getProgramByName", function(data){
        data.programmName = "Sport:+Football";

        var path = '/stores-active/contentInstance/event/' +
            'filter?numberOfResults=10&filter=' +
            '{"term":"tags.value.valueId","value":"'+data.programName+'"}&api_key='+ericsson_api_key;

        getRequestTo(path, function(error, response, body){
            console.log(response);
            io.emit("pushProgramByName", response);
        });
    });

    /* END ERICSSON */
});
