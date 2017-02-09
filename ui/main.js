alert('Yeah!');

var button = document.getElementById('b');

button.onclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
          var counter = request.responseText;
          var span = document.getElementById('d');
          span.innerHTML = counter.toString();
      }
  }
};
request.open('GET','http://venky-gh.imad.hasura-app.io/',true);
request.send(null);
};


