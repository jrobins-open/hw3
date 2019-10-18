var express = require('express'); // remember to install these in the top directory to fill in 
var path = require('path');      // your package.json, as well as anything else you want to add
var app = express();
app.use(express.static('../public/'));
var data = require('./database.json');
// Don't change anything above this line unless you know what it will do

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/../public/index.html'));
    app.use(express.static(path.join(__dirname, '/../public')));
});

app.get('/users/:username/password/:password',function(req,res){
    var user = req.params.username;
    var password = req.params.password;
    var x;
    var msg={"msg":"Cannot find specified username. Please try again", "success":"0"}; //Assume user cannot be found
    for (x in data){
        if (x==user){ //found user
            if (data[x].password==password){ //Good match!
                msg={"success":1,"username":x,"details":data[x].details};
            }
            else{
                msg={"msg":'Your password did not match that on file, please try again', "success":"0"}; //Case with bad password
            }
        }
    }
    res.send(msg);
});

app.listen(8080);