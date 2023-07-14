Kakao.init('5fe0ebff82917c2d9a3adb0e4c01eeec'); // 발급받은 키 중 JavaScript 키를 사용

console.log(Kakao.isInitialized()); // SDK 초기화 여부 판단

let $kakaoLogin = $('#kakaoLogin');
console.log($kakaoLogin);

$kakaoLogin.on('click', function(){
    kakaoLogin();
});

// 카카오로그인
function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (userVo) {
                    console.log(userVo)
                    let userId = userVo.id
                    let userGender = userVo.kakao_account.gender === 'male' ? 'M' : 'F'; // 성별을 M 또는 F로 변환

                    const data = {
                        userId: userId,
                        userEmail: userVo.kakao_account.email,
                        userGender: userGender,
                        userName: userVo.properties.nickname
                    };
                    // 서버로 userInfo 객체를 전송하는 로직을 구현
                    sendUserInfoToServer(data);
                    window.location.href = "http://localhost:10000/board/main"

                },
                fail: function (error) {
                    console.log(error);
                },
            });
        },
        fail: function (error) {
            console.log(error);
        },
    });
}

// 서버로 사용자 정보 전송
function sendUserInfoToServer(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/users/registerKakao');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            // 서버로부터 성공적인 응답을 받았을 때의 처리 로직
            console.log('User info sent successfully.');
        } else {
            // 서버로부터 실패 응답을 받았을 때의 처리 로직
            console.log('Failed to send user info.');
        }
    };
    xhr.send(JSON.stringify(data));
}


// 카카오로그아웃
    function kakaoLogout() {
        if (Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
                url: '/v1/user/unlink',
                success: function (response) {
                    console.log(response);
                    // 초기화 코드 추가
                    initializeKakaoAPI();
                    // 페이지 이동
                    window.location.href = "http://localhost:10000/board/main";

                },
                fail: function (error) {
                    console.log(error);
                },
            });
            Kakao.Auth.setAccessToken(undefined);
        }
}
