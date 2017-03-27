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
