var httpGet = function(theUrl)
{
//console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res=JSON.parse(xmlHttp.responseText);
            if (res.success==1){ //Good login
                var user={};
                user.name=res.username// Create user data
                user.details=res.details;
                updateUserInfo(user);              
            }
            else{ //Bad login
                document.getElementById('loginErrorMsg').innerHTML=res.msg;
            }
        }
    }  
    xmlHttp.open("GET", theUrl, false); //true for asynchronous
    xmlHttp.send();
}


document.getElementById("goToLoginButton").onclick = function() {showLogin()}; //Show login form
document.getElementById("confirmedLoginButton").onclick = function() {showLogin()}; //Show login form
document.getElementById("sideLoginButton").onclick = function() {showLogin()}; //Show login form
document.getElementById("loginButtonSubmit").onclick = function() {login()}; //Login (sends to databse)

function showLogin(){ //Shows login form and hides intro
    document.getElementById('collapseCardIntro').style.display="none";
    document.getElementById('loginCard').style.display="block";
}

function updateUserInfo(user){
    document.getElementById('loginCard').style.display="none";
    document.getElementById('userNameTag').innerText=user.name;
    document.getElementById('topLeftNameLabel').innerText=user.name;
    document.getElementById('pageHeading').innerText="Welcome back, "+user.name;
    document.getElementById('userCard').style.display="block";
    document.getElementById('notifyMsg').innerText="Hello, "+user.name +", more features soon!";
    
    //Data table
    var tbody = document.getElementById('dataTable');
    tbody.innerHTML +="<tr><td>Name</td><td>"+user.name+"</td></tr>";
    var obj=user["details"];
    var k=Object.keys(obj);
    for (var i = 0; i < k.length; i++) {
        var tr = "<tr>";
        tr += "<td>" + k[i] + "</td>" + "<td>" + obj[k[i]] + "</td></tr>";
        tbody.innerHTML += tr;
    }
}

function login(){
    var username = document.getElementById('InputLogin').value;
    var password = document.getElementById('InputPassword').value;
    document.getElementById('loginErrorMsg').innerHTML="";
    var theURL = '/users/' + username + '/password/' + password;
  httpGet(theURL);
}