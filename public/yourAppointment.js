$(document).ready(() => { 
    
  const loggedin = () => {

    const token = localStorage.token
    return !!token
  }
  var isloggedin = loggedin() 
  if(!isloggedin){
    window.location.href = "http://localhost:3000/login.html"
  }
  const token = localStorage.token
  fetch('http://localhost:3000/appointment/myAppointments',{
      method:"get",
      headers:new Headers({
        token
      })
  }).then(res=>res.json())
  .then(res=>{
      console.log(res)
  }).catch(err=>{
      console.log(err.message)
  })
})