


$(document).ready(()=>{ 
    var secret,email,password,rpPassword,user_name,age,phone

    $('.signupbtn').click(()=>{
        console.log("signup button clicked")
         email=$('.email').val() 
         user_name=$('.name').val() 
         phone=$('.phone').val() 
         age=$('.age').val() 
         password=$('.psw').val() 
         rpPassword=$('.rppsw').val() 
         
        fetch('http://localhost:3000/user/generateOTP',{  //calling backend and sending user data
			method:'post',
			body:JSON.stringify({
                email:email,
                user_name:user_name,
                phone:phone,
                age:age,
                password:password
			}),
			headers:new Headers({
				'content-type':'application/JSON'
			}) 
        })
        .then(res=>res.json())  // response kr rhe ki data mil gaya h a
        .then(data=>{   //backend ka response 
            console.log(data)  
            secret= data.secret  // hmlog ko jo secret diya h wo store krrhe 
            
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
         
        console.log(email,user_name,phone,age,password,rpPassword)
        fetch(`http://localhost:3000/user/verifyOTP/${secret}/${otp}`,{ 
			method:'post',
			body:JSON.stringify({ 
                email:email,
                user_name:user_name, 
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
            if(data.success){
                window.location.href = "http://localhost:3000/home.html"; 
            }
           
        }) 
        .catch(err=>{
            console.log(err)
        }) 
        
    })
   
}) 
 