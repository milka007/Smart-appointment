$(document).ready(()=>{
    $('.logout').click(function(){
        localStorage.removeItem("token")
        window.location.href = "http://localhost:3000/home.html"
    })
    $('.signup').click(()=>{
        window.location.href = "http://localhost:3000/signup.html"
    })
    $('.login').click(()=>{
        window.location.href = "http://localhost:3000/login.html"
    })
    $('.y-app').click(()=>{
        window.location.href = "http://localhost:3000/yourAppointment.html" 
    }) 

})