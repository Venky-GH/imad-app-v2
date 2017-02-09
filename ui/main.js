alert('Loaded!');

var button = document.GetElementById('button');

button.onlclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
          var counter =0;
          counter = counter + 1;
          var span = document.getElementById('count');
          span.innerHTML = counter.toString();
      }
  }
};
request.open('GET','http://venky-gh.imad.hasura-app.io/',true);
request.send(null);
};


