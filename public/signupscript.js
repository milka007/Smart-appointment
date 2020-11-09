


$(document).ready(() => {
    var secret, email, password, cPassword, user_name, age, phone



    $('.signupbtn').click(() => {
        console.log("signup button clicked")

        function validation() {
            var valid = true
            email = $('.email').val()
            user_name = $('.name').val()
            phone = $('.phone').val()
            age = $('.age').val()
            password = $('.psw').val()
            cPassword = $('.rppsw').val()
            
            if(email=="")
            {
                $('.emailerror').html("**Please fill Email")
                $(".emailerror").css("color", "red");
                valid = false

            }
            if(user_name=="")
            {
                $('.nameerror').html("**Please fill Name")
                $(".nameerror").css("color", "red");

                valid = false
            }
            if(phone=="")
            {
                $('.phoneerror').html("**Please fill Phone number")
                $(".phoneerror").css("color", "red");
                
                valid = false
            }
            if(age==""){
                $('.agerror').html("**Please fill age")
                $(".agerror").css("color", "red");

                valid = false

            }
            if(password=="")
            {
                $('.pswerror').html("**Password is empty")
                $(".pswerror").css("color", "red");

                valid = false
                
            }
            if(cPassword=="")
            {
                $('.cpswerror').html("**")
                $(".cpswerror").css("color", "red");

                valid = false

            }
            if(valid===false)
            {
                return false
            }


            var usercheck = /^[A-Za-z. ]{3,30}$/;
            var passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            // var usernamecheck = /^[a-z0-9_-]{3,16}$/
            var agecheck = /^[0-9]{1,3}$/
            var emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            var phonecheck = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/

            if (emailcheck.test(email)) {
                $('.emailerror').html("")
                valid = true
            } else {
                console.log("invalid name")
                $('.emailerror').html("Email invalid")
                $(".emailerror").css("color", "red");

                valid = false
                
            }
            if (usercheck.test(user_name)) {
                $('.nameerror').html("")
                valid = true

            } else {
                console.log("invalid name")
                $('.nameerror').html("Username invalid")
                $(".nameerror").css("color", "red");

                valid = false
                
            }

            if (phonecheck.test(phone)) {
                $('.phoneerror').html("")

                valid = true
            } else {
                console.log("invalid phone")
                $('.phoneerror').html("Phone number invalid")
                $(".phoneerror").css("color", "red");

                valid = false
                
            }
            if (agecheck.test(age)) {
                $('.agerror').html("")
                valid = true
            } else {
                console.log("invalid age")
                $('.agerror').html("age invalid")
                $(".ageerror").css("color", "red");

                valid = false
                
            }
            if (passwordcheck.test(password)) {
                $('.pswerror').html("")
                valid = true
            } else {
                console.log("invalid pswrd")
                $('.pswerror').html("Password invalid")
                $(".pswerror").css("color", "red");
                
                valid = false
                
            }

            if (cPassword.match(password)) {
                $('.cpswerror').html("")
                valid = true
            } else {
                console.log("pswrd not matching")
                $('.cpswerror').html("Password not matched ")
                $(".cpswerror").css("color", "red");

                valid = false
                
            }

            return valid;
        }
        var test = validation()
        if(!test)
        {
            return test;
        }

    

        fetch('http://localhost:3000/user/generateOTP', {  
            method: 'post', 
            body: JSON.stringify({
                email: email,
                user_name: user_name,
                phone: phone,
                age: age,
                password: password
            }),
            headers: new Headers({
                'content-type': 'application/JSON'
            })
        })
            .then(res => res.json())  
            .then(data => { 
                if(data.success===false)
                {
                    $('.emailerror').html("Email id Already Exists")
                    $(".emailerror").css("color", "red");
                    return;
                }   
                console.log(data)
                secret = data.secret  

                $('.d-none').show()
                $('.email-id').html(email)
                $('.signup').hide()
            })
            .catch(err => {
                console.log(err)
            })

    })

    $('.verifysignupbtn').click(() => {

        var otp = $('.otp').val()

        console.log(email, user_name, phone, age, password)
        fetch(`http://localhost:3000/user/verifyOTP/${secret}/${otp}`, {
            method: 'post',
            body: JSON.stringify({
                email: email,
                user_name: user_name,
                password: password,
                phone: phone,
                age: age
            }),
            headers: new Headers({
                'content-type': 'application/JSON'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.location.href = "http://localhost:3000/login.html";
                }

            })
            .catch(err => {
                console.log(err)
            })

    })

})
