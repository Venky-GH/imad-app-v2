/*

var button = document.getElementById('b');


var but = document.getElementById('button');
*/
var su = document.getElementById('sub');
var r = document.getElementById('re');

su.onclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
          alert('Successfully logged in!');
          console.log('Login Successful!');
          location.href = "http://venky-gh.imad.hasura-app.io/check-login";
      }
      else if(request.status === 403){
          alert('Invalid Username/Password!');
      }
      else if(request.status === 500){
          alert('Something went wrong on the server!');
      }
  }
};
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://venky-gh.imad.hasura-app.io/login' ,true);
request.setRequestHeader('Content-type','application/json');    
request.send(JSON.stringify({username: username, password: password}));

};

r.onclick = function (){
var request = new XMLHttpRequest();

request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
          alert('Successfully Registered!');
          location.href = "http://venky-gh.imad.hasura-app.io/user";
      }
      else if(request.status === 403){
          alert('Username already used!');
      }
      else if(request.status === 500){
          alert('Something went wrong on the server!');
      }
  }
};
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://venky-gh.imad.hasura-app.io/create-user' ,true);
request.setRequestHeader('Content-type','application/json');    
request.send(JSON.stringify({username: username, password: password}));

};

var redi = document.getElementById('asdf');
redi.onclick = function(){
  window.open('http://venky-gh.imad.hasura-app.io/logout');  
};

/*
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
          var ul = document.getElementById('ullist');
          ul.innerHTML = list;
      }
  }
};
var name_1 = document.getElementById('n');
var name = name_1.value;
request.open('GET','http://venky-gh.imad.hasura-app.io/submit?name=' + name ,true);
request.send(null);

};

button.onclick = function(){
  
  var request = new XMLHttpRequest();
  
  request.open('GET', 'http://venky-gh.imad.hasura-app.io/counter', true);
  request.send(null);
  
  request.onreadystatechange = function(){
    
    if(request.readyState === XMLHttpRequest.DONE)
    {
        if(request.status === 200)
        {
            var counter = request.responseText;
            var sm = document.getElementById('d');
            sm.innerHTML = counter;
        }
    }
  };
};
*/


