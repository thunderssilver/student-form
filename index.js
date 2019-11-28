var http=require('http');
var mysql=require('mysql');
var express=require('express');
const a=express();
var bodyParser=require('body-parser');
const port=8080;
a.use(bodyParser.urlencoded({extended:true}));
a.use(bodyParser.json());
a.set('view engine','pug');
a.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname})
});
var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"student"

});
con.connect(function(err)
{
	if(err){
		console.log("Error in connection");
	}
	else
	{
		console.log("Connected!!!");
	}

});

a.post('/submit',function(req,res){


	res.send({	Name:req.body.name,
				Email:req.body.email,
				Gender:req.body.gender,
				Course:req.body.course	
			});
	var sql="INSERT INTO details VALUES(null,'"+req.body.name+"','"+req.body.email+"','"+req.body.gender+"','"+req.body.course+"')"


con.query(sql,function(err,rows,fields){
	if(err){
		console.log("Error in query");
	}
	else
	{
		res.render('index',{title:'Data',message:'Data has been saved'})
	}
});
});
a.get('/users',function(req,res){


	var sql = "SELECT * from details";
	con.query(sql,function(err,rows,fields){
		if(err){
			console.log("Error in users");
		}
		else{




			res.send({row:rows,fields:fields});
			res.render('users',{title:'Student Details',items:rows});
		}
	});
});

a.delete('/delete',function(req,res){
	var sql="DELETE FROM details WHERE name='"+req.body.name+"'";
	con.query(sql,function(err,rows,fields){
		if(err){
			console.log("Error in deletion");
		}
		else
		{
			res.send({	
				name:req.body.name});
		}
	})
});
	
a.use('/api',require('./routes/api'));

a.listen(port,()=>console.log("listening on port::8080"));