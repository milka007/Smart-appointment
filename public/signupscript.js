const { resolveHostname } = require("nodemailer/lib/shared")

$(document).ready(()=>{ 
    var secret,email,password,rpPassword,name

    $('.signupbtn').click(()=>{
         email=$('.email').val() 
         name=$('.name').val() 
         phone=$('.phone').val() 
         age=$('.age').val() 
         password=$('.psw').val() 
         rpPassword=$('.rppsw').val() 
         
        fetch('http://localhost:3000/user/generateOTP',{ 
			method:'post',
			body:JSON.stringify({
                email:email,
                name:name,
                phone:phone,
                age:age,
                password:password
			}),
			headers:new Headers({
				'content-type':'application/JSON'
			}) 
        })
        .then(res=>res.json()) 
        .then(data=>{
            console.log(data) 
            secret= data.secret  
            
            $('.d-none').show()
            $('.email-id').html(email) 
            $('.signup').hide()
        }) 
        .catch(err=>{
            console.log(err)
        }) 
        
    })
   
    $('.verifysignupbtn').click(()=>{
       
        var otp = $('.otp').val()
         
        console.log(email,name,password,rpPassword)
        fetch(`http://localhost:3000/user/verifyOTP/${secret}/${otp}`,{ 
			method:'post',
			body:JSON.stringify({ 
                email:email,
                name:name, 
                password: password ,
                phone:phone,
                age:age
			}),
			headers:new Headers({
				'content-type':'application/JSON'
			}) 
        }) 
        .then(res=>res.json()) 
        .then(data=>{
            console.log(data)
           
        }) 
        .catch(err=>{
            console.log(err)
        }) 
        
    })
   
}) 
 