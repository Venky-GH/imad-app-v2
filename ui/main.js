

var button = document.getElementById('venky');


var but = document.getElementById('button');



button.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                document.getElementById("naidu").innerHTML = counter.toString();
            }
        }
    };
    request.open('GET','http://venky-gh.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

but.onclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
            var names = request.responseText;
            names = JSON.parse(names);
            var list = '';
          
          for (var i=0; i<names.length; i++)
          {
              list += '<li>' + names[i] + '</li>';
          }
          var ul = document.getElementById("ullist");
          ul.innerHTML = list;
      }
  }
};
var name_1 = document.getElementById('n');
var name = name_1.value;
name_1.value = "";
request.open('GET','http://venky-gh.imad.hasura-app.io/submit?name=' + name ,true);
request.send(null);

};








