var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/send', function(request, response){
	// Twilio Credentials 
	var accountSid = 'ACaa1be4143624675b21e7d5f2863a79b3'; 
	var authToken = 'd6d7032644e89b4b9d97e592126d3de8'; 
 
	//require the Twilio module and create a REST client 
	var client = require('twilio')(accountSid, authToken); 
 
	client.messages.create({  
 		from: "+12516162678",
 		to:"+919985965301",
 		body:"test message"    
		}, function(err, message) { 
 			console.log(message); 
 			response.send("done");
    });
});

app.get('port', function(){
	console.log('Node app is running on port', app.get('port'));
});

app.listen(app.get('port'), function(){
	console.log('Node listening at port', app.get('port'));
});