const express=require ("express");
const bodyParser=require("body-parser");
const app=express();
const request=require("request");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+ "/signup.html");
});
app.post("/",function(req,res){

 const firstName=req.body.fName;
 const lastName=req.body.lName;
 const email=req.body.email;
 const data={
   members:[
     {
       email_address:email,
       status:"subscribed",
       merge_fields:{
         FNAME: firstName,
         LNAME:lastName,
       }
     }
   ]
 }

      const jsonData =JSON.stringify(data);
      const url="https://us20.api.mailchimp.com/3.0/lists/64f66b75ab";
      const options={
        method:"POST",
        auth:"kalam13:59db3ec6c91edbdd67fd84cfa9a5cfb4-us20",
      }

    const request=  https.request(url,options,function(response){

      if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");

      }
      else {
        res.sendFile(__dirname+"/failure.html");
      }
        response.on("data",function(data){

        }
      )

    });
    request.write(jsonData);
    request.end();

  });

  app.post("/failure",function(req,res){

    res.redirect("/");
  })



 //console.log(firstName,lastName,email);
//});

app.listen(process.env.PORT || 3000,function(){
  console.log("server running at port 3000");
});


//api key
//59db3ec6c91edbdd67fd84cfa9a5cfb4-us20
//listid
//64f66b75ab
