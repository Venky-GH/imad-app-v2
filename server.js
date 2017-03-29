var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'venky-gh',
  database: 'venky-gh',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'RandomValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

var articles = {
'article-one': {
  title: 'Article One',
  content: `<p>This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
        </p>
        <p>This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
        </p>
        <p>This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
        </p>`,
   home: 'Home'
},
'article-three': {
    title: 'Article Three',
    content: `<h1>This is Article three!</h1>
    <p>This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
        </p>
        <p>This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
        </p>`,
     home: 'Home'
},
'article-two':{
    title: 'adasjd',
    content: '<h1>Hello</h1>',
    home: 'HOME'
}

};

app.get('/hashed', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'hashed.html')); 
});

app.get('/form', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'form.html')); 
});

function hash(input){
    var r = crypto.pbkdf2Sync(input, 'salt', 10000, 512, 'sha512');
    return r.toString('hex');
}

app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input);
   res.send(hashedString);
});

var pool = new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.post('/create-user', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   var dbString = hash(password);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function(err,result){
       if(err){
           res.status(500).send(err.toString());
           console.log('Registered!');
       } 
       else{
           res.status(200).send('User successfully created: ' + username);
       }
   });
});

app.post('/login', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   var dbString = hash(password);
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else if(result.rows === 0){
           res.status(403).send('Invalid Username/Password!');
       }
       else{
           var pas = result.rows[0].password;
           if(pas === dbString){
               
               req.session.auth = {userId: result.rows[0].username};
               
               res.status(200).send('User successfully logged in!');
           }
           else{
               res.status(403).send('Invalid Username/Password!');
           }
       }
   });
});

app.get('/user', function(req,res){
   res.sendFile(path.join(__dirname,'ui','user.html')); 
});

app.get('/registration_and_login', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'reg.html')); 
});

app.get('/check-login', function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in as: '+req.session.auth.userId.toString());
   }
   else{
       res.send('You are not logged in!');
   }
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('Loggged out Successfully!');
});

function aa(data){
    var title = data.title;
    var home = data.home;
    var content = data.content;
var aap = `<html>
    <head>
        <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
      <div class="abc">
        <div>
            <h1 class="heading"><a class="href" href="/">${home}</a></h1>
        </div>
        <hr>
        <div>
        ${content}
        </div>
      </div>
    </body>
</html>
`;
return aap;
}

var names1=[];
app.get('/submit', function(req, res){
   
   var name = req.query.name;
   names1.push(name);
   res.send(JSON.stringify(names1));
});

var counter = 0;
app.get('/counter',function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



app.get('/:articleName',function (req,res){
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length === 0){
               res.status(404).send('No Such Article Found!');
           }
           else{
               var articleData = result.rows[0];
               res.send(aa(articleData));
           }
       }
    });
    
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/main1.js', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'main1.js')); 
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/space.jpg', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'space.jpg')); 
});

app.get('/ui/me.jpg', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'me.jpg')); 
});

app.get('/ui/main2.js', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'main2.js')); 
});

app.get('/ui/main3.js', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'main3.js')); 
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
