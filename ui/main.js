console.log('Loaded!');

var counter= 0;

var a = document.getElementById("button");

a.onclick = function(){
  
  counter = counter + 1;
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
};

