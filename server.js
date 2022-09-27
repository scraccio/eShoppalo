const CONFIG = require("./config.json");

const express = require("express");
const path = require("path");
const translatte = require('translatte');
const {engine} = require('express-handlebars');
const app = express();
const {Worker, isMainThread, parentPort} = require('worker_threads');

const uri = "mongodb+srv://" + CONFIG.database.username + ':' + CONFIG.database.password + '@' + CONFIG.database.host + '/' + CONFIG.database.options;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var db = client.db("eShoppalo");
var collection = db.collection("games");
var userCollection = db.collection('users');
var postCollection = db.collection('posts');

var province = ['Agrigento','Alessandria','Ancona','Aosta','Arezzo','Ascoli Piceno','Asti','Avellino','Bari','Barletta-Andria-Trani','Belluno','Benevento','Bergamo','Biella','Bologna','Bolzano','Brescia','Brindisi','Cagliari','Caltanissetta','Campobasso','Carbonia-Iglesias','Caserta','Catania','Catanzaro','Chieti','Como','Cosenza','Cremona','Crotone','Cuneo','Enna','Fermo','Ferrara','Firenze','Foggia','Forlì-Cesena','Frosinone','Genova','Gorizia','Grosseto','Imperia','Isernia','La Spezia','L\'Aquila','Latina','Lecce','Lecco','Livorno','Lodi','Lucca','Macerata','Mantova','Massa-Carrara','Matera','Messina','Milano','Modena','Monza e della Brianza','Napoli','Novara','Nuoro','Olbia-Tempio','Oristano','Padova','Palermo','Parma','Pavia','Perugia','Pesaro e Urbino','Pescara','Piacenza','Pisa','Pistoia','Pordenone','Potenza','Prato','Ragusa','Ravenna','Reggio Calabria','Reggio Emilia','Rieti','Rimini','Roma','Rovigo','Salerno','Medio Campidano','Sassari','Savona','Siena','Siracusa','Sondrio','Taranto','Teramo','Terni','Torino','Ogliastra','Trapani','Trento','Treviso','Trieste','Udine','Varese','Venezia','Verbano-Cusio-Ossola','Vercelli','Verona','Vibo Valentia','Vicenza','Viterbo'];

const { getGamesAmerica, getGamesEurope, getGamesJapan, getQueriedGamesAmerica } = require('nintendo-switch-eshop');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static("./public", {
    extensions: ['html']
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//{date_from : { $gte : new Date("2022-01-01T20:15:31Z") } }

app.post("/api/calls/vetrina", async (req, res)=>{

    var array = [];

    collection.find({
        $or : [
            {'url' : req.body.url1},
            {'url' : req.body.url2},
            {'url' : req.body.url3},
            {'url' : req.body.url4},
            {'url' : req.body.url5},
            {'url' : req.body.url6},
            {'url' : req.body.url7},
            {'url' : req.body.url8},
        ]
    })
    .forEach(gameEU => {
        array.push(gameEU);
    })
    .then(()=>{
        res.status(200).send(array);
    });
});

app.post("/api/calls/registration", async (req, res)=>{
    userCollection.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: 'normal',
        posts: [],
        chats: []
    });
    res.status(200).send('ok');
});

app.post("/api/calls/grid", async (req, res)=>{
    var today = new Date();
    var array = [];
    if(req.body['title'] == null || req.body['title'].length == 0){
        collection.find({
            image_url_sq_s: { $exists: true},
            system_type: new RegExp('nintendoswitch_gamecard', 'i'),
            "dates_released_dts.0": {$lt: today.toISOString().split('.')[0]+"Z"}
        })
        .skip(isNaN(parseInt(req.body.skip))==true?0:parseInt(req.body.skip))
        .limit(parseInt(req.body.num))
        .forEach(gameEU => {
            array.push(gameEU);
        })
        .then(()=>{
            res.status(200).send(array);
        });
    }
    else{
        collection.find({
            image_url_sq_s: { $exists: true},
            title_extras_txt: new RegExp(req.body['title'], 'i'),
            system_type: new RegExp('nintendoswitch_gamecard', 'i'),
            "dates_released_dts.0": {$lt: today.toISOString().split('.')[0]+"Z"}
        })
        .skip(isNaN(parseInt(req.body.skip))==true?0:parseInt(req.body.skip))
        .limit(parseInt(req.body.num))
        .forEach(gameEU => {
            array.push(gameEU);
        })
        .then(async ()=>{
            if(req.body.city == null){
                res.status(200).send(array);
            }
            else{
                var sendArray = []; 
                for(let i=0; i<array.length; i++){
                    await postCollection.find(
                        {
                            gameId: array[i]._id.toString(),
                            city: req.body.city
                        },
                    )
                    .forEach((post)=>{
                        for(let j=0; j<sendArray.length; j++){
                            if(sendArray[j] === array[i]){
                                return;
                            }
                        }
                        sendArray.push(array[i]);
                    });
                }
                res.status(200).send(sendArray);
            }
        });
    }

});

app.get("/api/calls/searchgame/:title", (req, res)=>{
    var today = new Date();
    var array = [];
    collection.find({
        image_url_sq_s: { $exists: true},
        title_extras_txt: new RegExp(req.params.title, 'i'),
        system_type: new RegExp('nintendoswitch_gamecard', 'i'),
        "dates_released_dts.0": {$lt: today.toISOString().split('.')[0]+"Z"}
        
    })
    .forEach(gameEU => {
        array.push(gameEU);
    })
    .then(()=>{
        res.status(200).send(array);
    });
});

app.get("/api/calls/searchcity/:city", (req, res)=>{
    var array = [];
    for(let i=0; i<province.length; i++){
        if(province[i].toLowerCase().includes(req.params.city.toLowerCase())){
            array.push(province[i]);
        }
    }
    res.status(200).send(array);
});

app.post("/api/calls/featuredgrid", async (req, res)=>{

    var array = [];

    collection.find({
        $or : [
            {'url' : req.body.url1},
            {'url' : req.body.url2},
            {'url' : req.body.url3},
            {'url' : req.body.url4},
            {'url' : req.body.url5},
            {'url' : req.body.url6},
            {'url' : req.body.url7},
            {'url' : req.body.url8},
            {'url' : req.body.url9},
            {'url' : req.body.url10},
            {'url' : req.body.url11},
            {'url' : req.body.url12},
            {'url' : req.body.url13},
            {'url' : req.body.url14},
            {'url' : req.body.url15},
            {'url' : req.body.url16},
            {'url' : req.body.url17},
            {'url' : req.body.url18},
        ]
    })
    .forEach(gameEU => {
        array.push(gameEU);
    })
    .then(()=>{
        res.status(200).send(array);
    });
});

app.get('/catalogo/:title', (req, res)=>{
    res.render('main', {layout: 'game'});
});

app.post('/api/calls/translation', (req, res)=>{
    translatte(req.body.string, {to: 'it'})
    .then((result)=>{
        res.status(200).send(result);
    });
});

app.get("/api/calls/getgame/:title", (req, res)=>{
    var array = [];
    collection.find({
        title : req.params.title
    })
    .forEach(gameEU => {
        array.push(gameEU);
    })
    .then(()=>{
        res.status(200).send(array);
    });
});

app.get("/api/calls/checkuser/:email", (req, res)=>{
    var array = [];
    userCollection.find({
        email : req.params.email
    })
    .forEach(user => {
        array.push(user);
    })
    .then(()=>{
        if(array.length > 0){
            res.status(200).send('true');
        }
        else{
            res.status(200).send('false');
        }
    });
});

app.get("/api/calls/getuser/:email", (req, res)=>{
    var array = [];
    userCollection.find({
        email : req.params.email
    })
    .forEach(user => {
        array.push(user);
    })
    .then(()=>{
        if(array.length > 0){
            res.status(200).send(array[0]);
        }
        else{
            res.status(404).send('Utente non trovato');
        }
    });
});

app.post("/api/calls/checkpassword", (req, res)=>{
    
    var array = [];
    userCollection.find({
        email: req.body.email,
        password : SHA1(req.body.password)
    })
    .forEach(user => {
        array.push(user);
    })
    .then(()=>{
        if(array.length > 0){
            res.status(200).send(array[0]);
        }
        else{
            res.send('Utente non trovato');
        }
    });

});

app.post("/api/calls/insertpost", (req, res)=>{

    var user = JSON.parse(req.body.user);
    var date = new Date();
    dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    var post = {
        userId: user._id,
        userName: user.firstName,
        city: req.body.city,
        gameId: req.body.game,
        price: req.body.price,
        condition: req.body.condition,
        special: req.body.special,
        date: dateString
    }

    postCollection.insertOne(post, (err,docsInserted)=>{
        var id = docsInserted.insertedId;
        userCollection.updateOne(
            {email: user.email},
            {$push: {posts: id.toString()}}
        )
    });

    res.status(200).send('ok');
});

app.post('/api/calls/updateuser/:email', (req, res)=>{
    userCollection.updateOne(
        {email: req.params.email},
        {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }}
    );

    res.status(200).send('ok');
});

app.post('/api/calls/updateuserpassword/:email', (req, res)=>{
    console.log(req.body.newPassword);
    console.log(SHA1(req.body.newPassword));
    userCollection.updateOne(
        {email: req.params.email},
        {$set: {password: SHA1(req.body.newPassword)}}
    );

    res.status(200).send('ok');
});

app.post('/api/calls/sendmessage', (req, res)=>{
    var message = req.body.message;
    var sender = req.body.sender;
    var senderName = req.body.senderName;
    var receiver = req.body.receiver;
    var receiverName = req.body.receiverName;

    var date = new Date();
    var isodate = date.toISOString();

    if(sender != receiver){
        userCollection.updateOne(
            {_id: new ObjectId(sender)},
            {$push: {chats: {
                content: message,
                timestamp: isodate,
                sender: sender,
                senderName: senderName,
                receiver: receiver,
                receiverName: receiverName
            }}}
        );
        
        userCollection.updateOne(
            {_id: new ObjectId(receiver)},
            {$push: {chats: {
                content: message,
                timestamp: isodate,
                sender: sender,
                senderName: senderName,
                receiver: receiver,
                receiverName: receiverName
            }}}
        );

        res.status(200).send('ok');
    }
    else{
        res.status(200).send('Stesso utente');
    }

    
    
});

app.get("/api/calls/searchposts/:title", async (req, res)=>{
    var array = [];
    var gameArray = [];
    var title = req.params.title

    collection.find({title: title})
    .forEach(result => {
        gameArray.push(result);
    })
    .then(()=>{
        postCollection.find({ gameId: gameArray[0]._id.toString() })
        .forEach(post => {
            array.push(post);
        })
        .then(()=>{
            if(array.length > 0){
                res.status(200).send({array: array, gameArray: gameArray});
            }
            else{
                res.send('Nessun annuncio trovato');
            }
        });
    });


    
});

app.get("/api/calls/searchuserposts/:userId", async (req, res)=>{
    var array = [];
    var gameArray = [];
    postCollection.find({userId: req.params.userId})
    .forEach((post)=>{
        array.push(post);
    })
    .then(async ()=>{
        for(let i=0; i<array.length; i++){
            await collection.find({_id: new ObjectId(array[i].gameId)})
            .forEach((game)=>{
                gameArray.push(game);
            });
        }
        res.status(200).send([array, gameArray]);
    });
});

app.get("/api/calls/removepost/:postId", async (req, res)=>{
    var array = [];
    postCollection.deleteOne({_id: new ObjectId(req.params.postId)});
    res.status(200).send('ok');
});

app.get("/api/calls/getchats/:email", (req,res)=>{
    var array = [];
    userCollection.find({email: req.params.email})
    .forEach(user => {
        array.push(user);
    })
    .then(()=>{
        if(array.length > 0){
            console.log('Utente trovato');
            res.send(array[0].chats);
        }
        else{
            console.log('Utente non trovato');
            res.send('Utente non trovato');
        }
    });

});

app.get("/api/calls/searchuser/:userId", (req, res)=>{
    var array = [];
    userCollection.find({_id: new ObjectId(req.params.userId)})
    .forEach(user => {
        array.push(user);
    })
    .then(()=>{
        if(array.length > 0){
            console.log('Utente trovato');
            res.send(array[0]);
        }
        else{
            console.log('Utente non trovato');
            res.send('Utente non trovato');
        }
    });
});

app.get('/api/calls/scrape/:title', async (req, res)=>{
    var totalPrices = [];
    var title = req.params.title.toLowerCase()
    .replaceAll('&','%26').replaceAll(':','%3A').replaceAll('+', '%2B')
    .replaceAll(';','%3B').replaceAll('#','%23')
    .split(' ').join('+');

    const worker1 = new Worker('./worker.js');
    worker1.on('message', (data)=>{
        if(data.type == 'price'){
            res.status(200).send(data.chartData);
        }
        else if(data.type == 'messaggio'){
            console.log(data.message);
        }
        else if(data.type == 'none'){
            res.status(200).send(data.type);
        }
        
    });
    worker1.postMessage(['chart', 'https://www.pricecharting.com/search-products?q=' + title + '&type=prices&sort=name&console-uid=G87&region-name=all&exclude-variants=false']);
    //console.log('https://www.pricecharting.com/game/nintendo-switch/' + title);
    

});

app.all("*", (req, res)=>{
    res.status(404).send("404");
});

app.listen(CONFIG.server.port);

function SHA1 (msg) {

    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };

    function lsb_hex(val) {

        var str="";
        var i;
        var vh;
        var vl;

        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };


    function cvt_hex(val) {
        var str="";
        var i;
        var v;
        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
            break;
    }
    word_array.push( i );
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff);

    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}

