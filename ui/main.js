console.log('Loaded!');

var counter= 0;

var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === readyState.DONE)
  {
      if(request.status === 200)
      {
          counter = request.responseText;
          var span = document.getElementById('count');
          span.innerHTML = counter.toString();
      }
  }
};

request.open('GET','http://venky-gh.imad.hasura-app.io/',true);
request.send(null);
