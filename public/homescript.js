


$(document).ready(() => {
    fetch('http://localhost:3000/doctor/getAllDoctors', {
        method: "get"
    }).then(res => res.json())
        .then(res => {
            // console.log(res)
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i])
                $('.container').append(`
            <div class="parent-card">
            <div class="card">
                <img class="docimg" src="http://localhost:3000/images/doctor.jpg" height="100px" width="100px">
                <div class="about">
                    <div class="doctor-name">${res[i].doctor_name}</div> 
                    <div class="doctor-specialization">${res[i].specialization}</div>
                    <div class="phone">${res[i].phone}</div>
                    <div class="email">${res[i].email}</div>
                    <div class="Address">${res[i].address}</div>
                    <div class="fees">Fee: Rs. ${res[i].fee}</div>
                </div> 
                <button class="btn book-btn" doctorId="${res[i].doctor_id}">Book</button> 
            </div>

             </div>
            `)  
            }
            $('.book-btn').click(function () {
               var doctor_id = $(this).attr("doctorId")
               console.log(doctor_id)
            //    for (var i = 0; i < res.length; i++){
            //        if(doctor_id==res[i].doctor_id){
            //            console.log(res[i].slot)
            //        } 
            //    }
               var doctor = res.filter(data=> data.doctor_id==doctor_id)
               console.log(doctor[0].slot)
               
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    


}) 