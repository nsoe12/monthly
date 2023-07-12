
let cnt = $('.subsCnt').val();

const subList = Array.from(Array(50), () => new Array(2));


function calSubList(callback){

  $.ajax({

      url: '/calender/subsList',
      type:'post',
      dataType : 'json',
      async : false,
      success : function (result){
        console.log(result);
        result.forEach(sub => {
          const startDate = new Date(sub.subsStartDate);

          for (let i = 0; i < 3; i++) {
            const recurringEvent = {
              title: sub.productName + "-" + sub.productPrice + "원",
              start: new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate()+1),
              end: new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate()+1),
            };

            subList.push(recurringEvent);
          }


        });
        callback();
      },
  });
}





function calExSubList(callback){

  $.ajax({
    url: '/calender/exSubsList',
    type:'post',
    dataType : 'json',
    async : false,
    success : function (result){
      console.log(result);

      result.forEach(sub => {
        const startDate = new Date(sub.exSubsDate);

        for (let i = 0; i < 12; i++) {
          const recurringEvent = {
            title: sub.exSubsName + " " + sub.exSubsPrice + "원",
            start: new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate()+1),
            end: new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate()+1),
            color:"#FF0000",
          };

          subList.push(recurringEvent);
        }
      });
      callback();
    },

  });
}


function calenderStart(){
  document.addEventListener("DOMContentLoaded", function () {
    console.log("캘린더 시작하자 마자");
    console.log(subList);
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: "UTC",
      initialView: "dayGridMonth", // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
      events: subList,
      headerToolbar: {
        center: "addEventButton", // headerToolbar에 버튼을 추가
      },
      customButtons: {
        addEventButton: {
          // 추가한 버튼 설정
          text: "구독 추가", // 버튼 내용
          click: function () {
            // 버튼 클릭 시 이벤트 추가
            $("#calendarModal").modal("show"); // modal 나타내기

            $("#addCalendar").on("click", function () {
              // modal의 추가 버튼 클릭 시
              var content = $("#calendar_content").val();
              var start_date = $("#calendar_start_date").val();
              // var end_date = $("#calendar_end_date").val();
              var price = $("#calendar_price").val();

              //내용 입력 여부 확인
              if (content == null || content == "") {
                alert("내용을 입력하세요.");
              } else if (start_date == "") {
                alert("날짜를 입력하세요.");
              } else if (price == "" || price == null) {
                alert("가격을 입력하세요");
              } else {
                // 정상적인 입력 시
                var obj = {
                  exSubsName: content,
                  exSubsDate: start_date,
                  // end: end_date,
                  exSubsPrice: price,
                }; //전송할 객체 생성

                console.log(obj); //서버로 해당 객체를 전달해서 DB 연동 가능
              }
              $.ajax({
                url: '/calender/exSubsReigster',
                type:'post',
                data : JSON.stringify(obj),
                contentType:'application/json; charset=utf-8',
                success : function (result){
                  $("#calendarModal").modal("hide");
                  location.reload();
                },
                errer : function (){
                  console.log("실패")
                }
              });

            });
          },
        },
      },

      eventClick: function (info){
        if(info.event._def.ui.backgroundColor == "#FF0000"){
          if(confirm("'"+ info.event.title +"'  외부구독을 삭제하시겠습니까 ?")){
            // 확인 클릭 시
            info.event.remove();

            console.log(info.event);
            var events = new Array(); // Json 데이터를 받기 위한 배열 선언
            var obj = new Object();
            let arr = info.event._def.title.split(" ");
            obj.exSubsName = arr[0];
            events.push(obj);

            console.log(events);
            $.ajax({
              url: '/calender/exSubsRemove',
              method: "DELETE",
              dataType: "json",
              data: JSON.stringify(obj),
              contentType: 'application/json; charset=utf-8',
              success : function (){
                console.log("삭제 성공");

              }
            });
            location.reload();
          }

        }else {
          if(confirm("'"+ info.event.title +"'  상품 구독을 삭제하시겠습니까 ?")){
            // 확인 클릭 시
            info.event.remove();

            console.log(info.event);// Json 데이터를 받기 위한 배열 선언
            var subs = new Object();
            let arr = info.event._def.title.split("-");
            subs.productName = arr[0];
            console.log(arr);
            //events.push(subs);

            console.log(subs);
            $.ajax({
              url: '/calender/subsRemove',
              method: "DELETE",
              dataType: "json",
              data: JSON.stringify(subs),
              contentType: 'application/json; charset=utf-8',
              success : function (){
                console.log("삭제 성공");

              }
            });
            location.reload();
          }

        }

      },
      editable: true, // false로 변경 시 draggable 작동 x
      displayEventTime: false, // 시간 표시 x
      datesSet: function (info) {
        var currentMonth = info.view.currentStart.getMonth();
        var currentYear = info.view.currentStart.getFullYear();
        var currentMonthFirstDate = new Date(currentYear, currentMonth, 1);
        var currentMonthLastDate = new Date(currentYear, currentMonth + 1, 0);

        calendar.getEvents().forEach(function (event) {
          var eventStart = event.start;

          if (
              eventStart < currentMonthFirstDate ||
              eventStart > currentMonthLastDate
          ) {
            event.setProp("display", "none");
          } else {
            event.setProp("display", "auto");
          }
        });
      },
    });
    calendar.render();
  });
}


calSubList(function() {
  calExSubList(function() {
     calenderStart();
   });
 });
