$(document).ready(()=>{
    var email,password

    $('.loginbtn').click(()=>{
         email=$('.email').val() 
         password=$('.psw').val() 
         
        fetch('http://localhost:3000/user/login',{ 
			method:'post',
			body:JSON.stringify({
                email:email,
                password:password
			}), 
			headers:new Headers({
				'content-type':'application/JSON'
			})        
        })
         .then(res=>res.json()) 
        .then(data=>{
            if(!data.success){
                $('.error').html(data.message)
                $('.error').show()
            }
            else{
                const token = data.token
                localStorage.token= token
                window.location.href="http://localhost:3000/home.html"
            }
        }) 
        .catch(err=>{
            console.log(err)
        }) 
        
    })
   
   
}) 
 