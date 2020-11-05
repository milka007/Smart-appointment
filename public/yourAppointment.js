$(document).ready(() => { 
    
  const loggedin = () => {

    const token = localStorage.token
    return !!token
  }
  var isloggedin = loggedin() 
  if(!isloggedin){
    window.location.href = "http://localhost:3000/login.html"
  }

  const dateconvert = (date) =>{
    date = new Date(date)
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear() 
    return `${d}/${m}/${y}`
  }

  const token = localStorage.token
  fetch('http://localhost:3000/appointment/myAppointments',{
      method:"get",
      headers:new Headers({
        token
      })
  }).then(res=>res.json())
  .then(res=>{
    for(var i of res){
      
      $('.container').append(`
      <div class="parent-card">
            <div class="card">
                <div class="about">
                    <div class="doctor-name">${i.doctor_name}</div>
                    <div class="address">${i.address}</div>
                    <div class="bookdate w-50">
                        <span class="date-txt text">Appointment Date</span>
                        <br>
                        <span class="date">${dateconvert(i.date)}</span>
                    </div>
                    <div class="booktime w-50">
                        <span class="time-txt text">Appointment Time</span><br>
                        <span class="time">${i.time}</span>
                    </div>
                    <div class="fees w-50">
                        <span class="fee-txt text">Fee(Rs.)</span><br>
                        <span class="fee">${i.fee}</span>
                    </div>
                    <div class="bookedon w-50">
                        <span class="book-txt text">Booked on</span><br>
                        <span class="book">${dateconvert(i.bookedon)}</span>
                    </div>
                    <div class="appointment-id">
                        <span class="appoint-txt text">Appointment ID</span><br>
                        <span class="appointid">${i.appointment_id}</span>
                    </div>
                </div>
            </div>

        </div>
      `)
    }

      console.log(res)
  }).catch(err=>{
      console.log(err.message)
  })
})