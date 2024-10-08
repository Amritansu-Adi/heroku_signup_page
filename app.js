const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT;
app.listen(PORT || 3000, function(){
    console.log(PORT)
})

app.get('/', function(req,res){
    
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req,res){
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = 'https://us17.api.mailchimp.com/3.0/lists/b10984e16d'

    const options = {
        method: 'POST',
        auth:'Amrit:ba84d07b7f0b08e95aa17160097b2587-us17'
    }
    
    const request = https.request(url, options, function(response){
        console.log(response)
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }
        else
        {
            res.sendFile(__dirname + '/failure.html')
        }
        response.on('data', function(data){
            console.log(JSON.parse(data))
        });
    });
    
    request.write(jsonData);
    request.end();
    })

// ba84d07b7f0b08e95aa17160097b2587-us17
