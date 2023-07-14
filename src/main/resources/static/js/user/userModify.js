//비밀번호 일치 여부 확인
$(".pw").focusout(function () {
  var pwd1 = $("#userNewPassword").val();
  var pwd2 = $("#checkPassword").val();

  if (pwd1 != "" && pwd2 == "") {
    null;
  } else if (pwd1 != "" || pwd2 != "") {
    if (pwd1 == pwd2) {
      $("#alert-success").css("display", "inline-block");
      $("#alert-danger").css("display", "none");
    } else {
      //alert("비밀번호가 일치하지 않습니다. 비밀번호를 재확인해주세요.");
      $("#alert-success").css("display", "none");
      $("#alert-danger").css("display", "inline-block");
    }
  }
});

//비밀번호 조건 확인
function check_pw() {
  var pw = document.getElementById("userNewPassword").value;
  var SC = ["!", "@", "#", "$", "%"];
  var check_SC = 0;

  if (pw.length < 6 || pw.length > 16) {
    document.getElementById("userNewPassword").value = "";
    document.getElementById("checked").innerHTML =
      "비밀번호는 8글자 이상, 16글자 이하만 이용 가능합니다.";
    document.getElementById("checked").style.color = "red";
  }
  for (var i = 0; i < SC.length; i++) {
    if (pw.indexOf(SC[i]) != -1) {
      check_SC = 1;
    }
  }
  if (check_SC == 0) {
    document.getElementById("userNewPassword").value = "";
    document.getElementById("checked").innerHTML =
      "!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.";
    document.getElementById("checked").style.color = "red";
  } else{
    document.getElementById("checked").innerHTML = "사용가능합니다"
    document.getElementById("checked").style.color = "blue";
  }
  if (
    document.getElementById("userNewPassword").value != "" &&
    document.getElementById("checkPassword").value != ""
  ) {
    if (
      document.getElementById("userNewPassword").value ==
      document.getElementById("checkPassword").value
    ) {
      document.getElementById("check").innerHTML = "비밀번호가 일치합니다.";
      document.getElementById("check").style.color = "blue";
    } else {
      document.getElementById("check").innerHTML =
        "비밀번호가 일치하지 않습니다.";
      document.getElementById("check").style.color = "red";
    }

  }

}

$('#userPassword').on('change',function (){
    console.log($('.hiddenPw').val());
    console.log($('#userPassword'));
  if($('.hiddenPw').val() == $('#userPassword').val()){
    document.getElementById("pwchk").innerHTML = "비밀번호가 일치합니다.";
    document.getElementById("pwchk").style.color = "blue";
  }else{
    document.getElementById("pwchk").innerHTML = "비밀번호가 일치하지 않습니다.";
    document.getElementById("pwchk").style.color = "red";
  }
});




function submitCheck() {


  if($('.hiddenPw').val() == $('#userPassword').val() && $('#userNewPassword').val() == $('#checkPassword').val() ) {

    return true;
  }else if($('#userNewPassword').val() != $('#checkPassword').val()){
    alert("변경할 비밀번호를 확인하세요");
    return false;
  } else {
    alert("비밀번호를 확인하세요");
    return false;
  }




  return false;

}


function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // document.getElementById("address2").value = extraAddr;
      } else {
        // document.getElementById("address2").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postAddress").value = data.zonecode;
      document.getElementById("address1").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("address2").focus();
    },
  }).open();
}

$(".backBtn").on("click", function () {
  location.href = "mypage.html";
});

// let gender = $('.gender').val();

let gender = document.getElementById("gender").value;

console.log(gender);

if(gender == 'M'){
  $("input:radio[name ='gender']:input[value='M']").attr("checked", true);
}else {
  $("input:radio[name ='gender']:input[value='F']").attr("checked", true);
}

let birthday = $('#userBirthday').val().substring(0,10)

$('#userBirthday').val(birthday);









