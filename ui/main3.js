var t = document.getElementById('hsubmit');
t.onclick = function(){
  
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
            var h = document.getElementById('houtput');
            var k = request.responseText;
            h.value = k.toString();
        }
    }  
  };
  var g = document.getElementById('hinput');
  var y = g.value;
  request.open('GET','http://venky-gh.imad.hasura-app.io/hash/:' + y,true);
  request.send(null);
};