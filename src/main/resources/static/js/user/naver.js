var naverLogin = new naver.LoginWithNaverId({
    clientId: "ZyZIG611nSR6a00ApfSc", // 내 애플리케이션 정보에 cliendId를 입력해줍니다.
    callbackUrl: "http://localhost:10000/board/main", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
    isPopup: false,
    callbackHandle: true
});

naverLogin.init();

window.addEventListener('load', function () {
    naverLogin.getLoginStatus(function (status) {
        if (status) {
            var email = naverLogin.user.getEmail();
            if (email == undefined || email == null) {
                alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                naverLogin.reprompt();
                return;
            }

            // 유저 정보를 서버로 전송
            console.log(naverLogin.user);
            sendNaverUserInfoToServer(naverLogin.user);
        } else {
            console.log("callback 처리에 실패하였습니다.");
        }
    });
});

// 서버로 네이버 로그인 정보 전송
function sendNaverUserInfoToServer(userVo) {
    const data = {
        userId: userVo.id,
        userName: userVo.name,
        userEmail: userVo.email,
        userPhoneNumber: userVo.mobile,
        userGender: userVo.gender,
        // userBirthday: userVo.birthday
    };

    fetch('/users/registerNaver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('Naver login information sent to the server successfully.');
                // 로그인 성공 후 페이지 이동 등의 동작 수행
            } else {
                console.error('Failed to send Naver login information to the server.');
            }
        })
        .catch(error => {
            console.error('An error occurred while sending Naver login information:', error);
        });
}

// 네이버 API 정보 초기화
function naverLogout() {
    var naver_id_login = new naver.LoginWithNaverId(
        {
            clientId: "ZyZIG611nSR6a00ApfSc", // 내 애플리케이션 정보에 cliendId를 입력해줍니다.
            callbackUrl: "http://localhost:10000/board/main", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
            isPopup: false,
            callbackHandle: true
        }
    );
    naver_id_login.logout();
    console.log('Naver API 정보 초기화 완료');
}

// 로그아웃 버튼 클릭 이벤트 처리
var logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function () {
    // 네이버 API 정보 초기화 함수 호출
    naverLogout();
    // 로그아웃 후 페이지 이동 등의 동작 수행
    window.location.href = 'http://localhost:10000/board/main';
});
