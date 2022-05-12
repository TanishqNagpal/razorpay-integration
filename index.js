const express=require("express");
const Razorpay=require("razorpay");

let app=express(); 

const razorpay=new Razorpay({

    key_id: "rzp_test_uOlQOrpdrVORzm",
    key_secret:"bqLHAV7Ih5mia212Hnx4h7Qi",
});
  


app.set('views','views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));


app.get("/",function(req,res){

    res.render("razorpay.ejs");
});

app.post("/order", function(req,res){

    var options = {
      amount: 50000 ,
      currency: "INR" ,
  
    };
  
    razorpay.orders.create(options, function(err, order){
      
      console.log(order);
      res.json(order);
    });
});

app.post("/is-order-complete",function(req,res){

  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{

    if(paymentDocument.status =="captured")
    {
      res.send("Payment successful");
    }
    else{

      res.redirect("/");
    }
});

});




app.listen(3000,function(){

  console.log("server on port 3000");

})

