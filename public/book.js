
$(document).ready(() => {

  const loggedin = () => {

    const token = localStorage.token
    return !!token
  }
  var isloggedin = loggedin()
  if (!isloggedin) {
    window.location.href = "http://localhost:3000/login.html"
  }
  var d = new Date();
  var alreadybooked
  var bookdate = new Date();
  var booktime, doctorslot


  var Calendar = {
    themonth: d.getMonth(), // The number of the month 0-11
    theyear: d.getFullYear(), // This year
    today: [d.getFullYear(), d.getMonth(), d.getDate()], // adds today style
    selectedDate: null, // set to today in init()
    years: [], // populated with last 10 years in init() 
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    init: function () {
      this.selectedDate = this.today
      var monthindex = Calendar.selectedDate[1]
      var weekindex = d.getDay()
      $('.todaysdate').html(` ${Calendar.selectedDate[2]},${Calendar.months[monthindex]},${Calendar.selectedDate[0]}`)
      
      // Populate the list of years in the month/year pulldown
      var year = this.theyear;
      for (var i = 0; i < 10; i++) {
        this.years.push(year++);
      }

      this.bindUIActions();
      this.render();
    },

    bindUIActions: function () {
      // Create Years list and add to ympicker
      for (var i = 0; i < this.years.length; i++)
        $('<li>' + this.years[i] + '</li>').appendTo('.calendar-ympicker-years');
      this.selectMonth(); this.selectYear(); // Add active class to current month n year

      // Slide down year month picker
      $('.monthname').click(function () {
        $('.calendar-ympicker').css('transform', 'translateY(0)');
      });

      // Close year month picker without action
      $('.close').click(function () {
        $('.calendar-ympicker').css('transform', 'translateY(-100%)');
      });

      // Move calander to today
      $('.today').click(function () {
        Calendar.themonth = d.getMonth();
        Calendar.theyear = d.getFullYear();
        Calendar.selectMonth(); Calendar.selectYear();
        Calendar.selectedDate = Calendar.today;
        Calendar.render();
        $('.calendar-ympicker').css('transform', 'translateY(-100%)');
      });

      // Click handlers for ympicker list items
      $('.calendar-ympicker-months li').click(function () {
        Calendar.themonth = $('.calendar-ympicker-months li').index($(this));
        Calendar.selectMonth();
        Calendar.render();
        $('.calendar-ympicker').css('transform', 'translateY(-100%)');
      });
      $('.calendar-ympicker-years li').click(function () {
        Calendar.theyear = parseInt($(this).text());
        Calendar.selectYear();
        Calendar.render();
        $('.calendar-ympicker').css('transform', 'translateY(-100%)');
      });

      // Move the calendar pages
      $('.minusmonth').click(function () {
        Calendar.themonth += -1;
        Calendar.changeMonth();
      });
      $('.addmonth').click(function () {
        Calendar.themonth += 1;
        Calendar.changeMonth();
      });
    },

    // Adds class="active" to the selected month/year
    selectMonth: function () {
      $('.calendar-ympicker-months li').removeClass('active');
      $('.calendar-ympicker-months li:nth-child(' + (this.themonth + 1) + ')').addClass('active');
    },
    selectYear: function () {
      $('.calendar-ympicker-years li').removeClass('active');
      $('.calendar-ympicker-years li:nth-child(' + (this.years.indexOf(this.theyear) + 1) + ')').addClass('active');
    },

    // Makes sure that month rolls over years correctly
    changeMonth: function () {
      if (this.themonth == 12) {
        this.themonth = 0;
        this.theyear++;
        this.selectYear();
      }
      else if (this.themonth == -1) {
        this.themonth = 11;
        this.theyear--;
        this.selectYear();
      }
      this.selectMonth();
      this.render();
    },

    // Helper functions for time calculations
    TimeCalc: {
      firstDay: function (month, year) {
        var fday = new Date(year, month, 1).getDay(); // Mon 1 ... Sat 6, Sun 0
        if (fday === 0) fday = 7;
        return fday - 1; // Mon 0 ... Sat 5, Sun 6
      },
      numDays: function (month, year) {
        return new Date(year, month + 1, 0).getDate(); // Day 0 is the last day in the previous month
      }
    },

    render: function () {
      var days = this.TimeCalc.numDays(this.themonth, this.theyear), // get number of days in the month
        fDay = this.TimeCalc.firstDay(this.themonth, this.theyear), // find what day of the week the 1st lands on        
        daysHTML = '', i;

      $('.calendar p.monthname').text(this.months[this.themonth] + '  ' + this.theyear); // add month name and year to calendar
      for (i = 0; i < fDay; i++) { // place the first day of the month in the correct position
        daysHTML += '<li class="noclick">&nbsp;</li>';
      }
      // write out the days
      for (i = 1; i <= days; i++) {
        if (this.today[0] == this.selectedDate[0] &&
          this.today[1] == this.selectedDate[1] &&
          this.today[2] == this.selectedDate[2] &&
          this.today[0] == this.theyear &&
          this.today[1] == this.themonth &&
          this.today[2] == i)
          daysHTML += '<li class="active today">' + i + '</li>';
        else if (this.today[0] == this.theyear &&
          this.today[1] == this.themonth &&
          this.today[2] == i)
          daysHTML += '<li class="today">' + i + '</li>';
        else if (this.selectedDate[0] == this.theyear &&
          this.selectedDate[1] == this.themonth &&
          this.selectedDate[2] == i)
          daysHTML += '<li class="active">' + i + '</li>';
        else
          daysHTML += '<li>' + i + '</li>';

        $('.calendar-body').html(daysHTML); // Only one append call
      }

      // Adds active class to date when clicked
      $('.calendar-body li').click(function () { 

        if (!$(this).hasClass('noclick')) {
          $('.calendar-body li').removeClass('active');
          $(this).addClass('active');
          Calendar.selectedDate = [Calendar.theyear, Calendar.themonth, $(this).text()]; 
          var date = Calendar.selectedDate[2]
          var month = Calendar.selectedDate[1]
          var year = Calendar.selectedDate[0]
          bookdate = new Date()
          bookdate.setFullYear(year, month, date)
          bookdate.setHours(0, 0, 0, 0)
          var index = Calendar.selectedDate[1]
          $('.todaysdate').html(` ${Calendar.selectedDate[2]},${Calendar.months[index]},${Calendar.selectedDate[0]}`)
          var slot = doctorslot
          for (var a of alreadybooked) {
            var tempdate = new Date(a.date)
            if (tempdate.getTime() === bookdate.getTime()) {
              var temptime = a.time
              slot = slot.filter(time => time != temptime)
            }
          }
          $('.slots').html("")
          for (var i = 0; i < slot.length; i++) {
            $('.slots').append(`
            <div class="butn">
              <button class="btn tme">${slot[i]}</button>
            </div> 
            `)

          }
          $('.tme').click(function () {

            booktime = $(this).html()
            $('.active-btn').removeClass("active-btn")
            $(this).addClass('active-btn')

          })
        }
      });
    }
  };

  Calendar.init();


  var url = window.location.href
  var data = url.split("?")
  data = data[1]
  data = data.split("&")
  var urldata = {}
  for (var i = 0; i < data.length; i++) {

    var data2 = data[i].split("=")
    urldata[data2[0]] = data2[1]
  }

  var doctor_id = urldata.doctor_id
  fetch(`http://localhost:3000/doctor/getDetails/${doctor_id}`, {
    method: 'get'
  }).then(res => res.json())
    .then(res => {

      $('.doc-container').append(`
      
      <div class="parent-card">
        <div class="card">
          <img class="docimg" src="http://localhost:3000/images/doctor.jpg" height="100px" width="100px">
          <div class="about">
              <div class="doctor-name">${res[0].doctor_name}</div> 
              <div class="doctor-specialization">${res[0].specialization}</div>
              <div class="phone">${res[0].phone}</div>
              <div class="email">${res[0].email}</div>
              <div class="Address">${res[0].address}</div>
              <div class="fees">Fee: Rs. ${res[0].fee}</div>
          </div> 
          <div>
            <button class="btn cfn">Confirm booking </button>
          
          </div>
        </div> 

      </div> 
      `)
      doctorslot = res[0].slot


      $('.cfn').click(function () {

        if (!bookdate || !booktime) {
          $('.popup-text').html('Please select time for appointment')
          $('.popup').show()
          return;
        }
        bookdate= new Date(bookdate)
        var todaydate = new Date()
        todaydate.setHours(0,0,0,0) 
        if(todaydate.getTime()>=bookdate.getTime()){ 

          $('.popup-text').html('Please select valid date')
          $('.popup').show()
          return;
        }
        const token = localStorage.token
        $('.popup-spinner').show()
        fetch(`http://localhost:3000/appointment/createAppointment`, {
          method: 'post',
          body: JSON.stringify({
            doctor_id,
            time: booktime,
            date: bookdate
          }),
          headers: new Headers({
            token,
            'content-type': 'application/JSON'
          })
        }).then(res => res.json())
          .then(res => {
            $('.popup-spinner').hide()
            if (res.success) {
              $('.popup-text').html('Your appointment has been booked')
              $('.popup').show()
              setTimeout(() => {
                window.location.href = "http://localhost:3000/home.html"
              }, 5000);
            }
            else {
              $('.popup-text').html('This appointment time is already booked')
              $('.popup').show()

            }

          })
            .catch(err =>{
            console.log(err.message)
            })


      })
      $('.ok-btn').click(function () {
        $('.popup').hide()
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  fetch(`http://localhost:3000/appointment/allAppointments/${doctor_id}`, {
    method: "get"
  }).then(res => res.json())
    .then(res => {
      alreadybooked = res
      var slot = doctorslot
      bookdate=new Date(bookdate)
      bookdate.setHours(0,0,0,0)
      for (var a of alreadybooked) {
        var tempdate = new Date(a.date)
        if (tempdate.getTime() === bookdate.getTime()) {
          var temptime = a.time
          slot = slot.filter(time => time != temptime)
        }
      }
      $('.slots').html("")
      for (var i = 0; i < slot.length; i++) {
        $('.slots').append(`
        <div class="butn">
          <button class="btn tme">${slot[i]}</button>
        </div> 
        `)

      }
      $('.tme').click(function () {

        booktime = $(this).html()
        $('.active-btn').removeClass("active-btn")
        $(this).addClass('active-btn')


      })
    })
    .catch(err => {
      console.log(err.message)
    })

    



})    