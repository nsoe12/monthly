var naverLogin = new naver.LoginWithNaverId({
    clientId: "ZyZIG611nSR6a00ApfSc",
    callbackUrl: "http://localhost:10000/board/main",
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
            sendNaverUserInfoToServer(naverLogin.user);
        } else {
            console.log("네이버 계정으로 로그인 하지 않음.");
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

    // 네이버 API 정보 전송 함수
    function sendNaverInfo() {
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

    // 로그아웃 시 해당 코드 비활성화
    if (window.location.pathname !== '/board/main') {
        console.log('Naver login information will not be sent.');
        return;
    }

    // 로그인 정보 전송
    sendNaverInfo();
}
