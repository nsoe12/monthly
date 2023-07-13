import * as sub from '../module/adminSearch.js';

function showList(map){
    console.log(map);
    let list = '';

    map.forEach(i =>{
        list +=`
          <tr class="subsNumber" data-num="${i.subsNumber}"> 
                <td>${i.userNumber}</td>
                <td >${i.subsNumber}</td>
                <td>${i.productName}</td>
                <td>${i.userName}</td>
                <td>${i.userId}</td>
                <td>${i.subsStartDate}</td>
                <td>20일</td>
                <td>
                  <button type="button" class="message-submit-btn" data-phone="${i.userPhoneNumber}"> 전송 </button>   
                </td>
                <td><button type="button" class="out-btn"> 구독 취소 </button></td>
             </tr>
        `;
    });
    $('.sub-list-body').html(list);
}

//에러 코드
function showError(a, b, c) {
    console.error(c);
}

let globalProductNumber = 0;
let globalSearchInput = '';

// 검색 조건에 따른 구독자 조회
$('.search-btn-ct').on('click', '.search-btn',function (e) {
    let productNumber = $(e.target).closest('tr').find('.product-number').text();
    let searchInput = $(e.target).closest('tr').find('.subscriber-input').text();

// $('.service-name').text(productName) $(e.target).closest('tr').find('.product-number').text();;
//let searchVo = { "productName" : productName}
// let productName = $(e.target).closest('tr').find('.product-name').text();}

    globalProductNumber = productNumber;
    globalSearchInput = searchInput;

    sub.productSubsUserList({subscriberInput : searchInput, productNumber : productNumber}, showList, showError);

})
//기간 조건 클릭
$('.period-input').on('click','.period', function (){
    let searchPeriod = $('input[name=period]:checked').val();
    sub.productSubsUserList({subscriberInput : globalSearchInput, productNumber : globalProductNumber, period : searchPeriod}, showList, showError);

})


//강제 구독 취소
$('.sub-list-body').on('click','.out-btn',function (){
   let subsNumber = $(this).closest('.subsNumber').data('num');
    let searchPeriod = $('input[name=period]:checked').val();
    console.log(subsNumber);
    console.log(subsNumber+"번 구독자 삭제 완료====================");
    sub.removeSubs(subsNumber, function (){
        sub.productSubsUserList({subscriberInput : globalSearchInput, productNumber : globalProductNumber, period : searchPeriod}, showList, showError);
    },showError);

});




$('.sub-list-body').on('click','.message-submit-btn',function (){
    let phoneNumber = $('.message-submit-btn').data('phone'); // 전화번호 가져오기
    console.log(phoneNumber+"============");
    sendSMS(phoneNumber);
});

//버튼 클릭 시 문자 보내기
// $(document).ready(function() {
//     $('.message-submit-btn').click(function() {
//         let phoneNumber = $(this).data('phone'); // 전화번호 가져오기
//         sendSMS(phoneNumber);
//     });
// });
function sendSMS(phoneNumber) {
    // 암호화된 accessKey와 secretKey
    let accessKey = 'accessKey';
    let secretKey = 'secretKey';

    // 네이버 클라우드 SMS API 설정
    let serviceId = "ncp:sms:kr:311302469407:monthly";
    let message = {
        content: "[Monthly.] \n" +
            "안녕하세요.\n\n " +
            "회원님의 상품 구독 재결제일까지 \n" +
            "3일 남았습니다.\n" +
            "\n 알고있으삼^^;"
    };

    // SMS API 호출
    $.ajax({
        type: 'POST',
        // url: '/sms/v2/services/' + serviceId + '/messages',
        url:'/sms/v1/send',
        data: JSON.stringify({
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            // from: phoneNumber,
            to: phoneNumber,
            content: message.content
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-NCP-auth-key': accessKey,
            'X-NCP-service-secret': secretKey
        },
        success: function(data) {
            console.log('SMS 전송 성공');
        },
        error: function(error) {
            console.log('SMS 전송 실패:', error);
        }
    });
}