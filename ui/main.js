

var button = document.getElementById('b');
var name_1 = document.getElementById('n');
var nam = name_1.value;
var but = document.getElementById('button');


but.onclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
            var names = request.responseText;
            names = JSON.parse(names);
          
          for (var i=0; i<names.length; i++)
          {
              list += '<li>' + names[i] + '</li>';
          }
          var ul = document.getElementById('ullist');
          ul.innerHTML = list;
      }
  }
};
request.open('GET','http://venky-gh.imad.hasura-app.io/submit?name=' + nam,true);
request.send(null);
};




