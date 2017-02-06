var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
}

};

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
        <div>
            <h1><a href="/">${home}</a></h1>
            <hr/>
        </div>
        <div>
        ${content}
        </div>
    </body>
</html>
`;
return aap;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function (req,res){
    var articleName = req.params.articleName;
    res.send(aa(articles[articleName])); 
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
