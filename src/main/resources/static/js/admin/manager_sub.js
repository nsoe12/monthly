import * as sub from '../module/adminSearch.js';
let page = 1;
let searchInput = '';
let period = '';
let productNumber=0;
let productName='';

// $(function (){
//     searchInput = $('.subscriber-input').val();
//     period = $('input[name="period"]:checked').val();
//
// })

function showList(map){
    if (map.subsList.length == 0) {
        $('.empty').removeClass('none');
    } else {
        $('.empty').addClass('none');}

    console.log(map);
    let list = '';

    map.subsList.forEach(i =>{
        list +=`
          <tr class="subsNumber" data-num="${i.subsNumber}"> 
                <td>${i.userNumber}</td>
                <td >${i.subsNumber}</td>
                <td>${i.productName}</td>
                <td>${i.userName}</td>
                <td>${i.userId}</td>
                <td>${i.subsStartDate}</td>
                <td>
                  <button type="button" class="message-submit-btn" data-phone="${i.userPhoneNumber}"> 전송 </button>   
                </td>
                <td><button type="button" class="out-btn"> 구독 취소 </button></td>
             </tr>
        `;
    });

    //====================여기 띄우는 곳인데 페이지버튼 띄우는 html view===============
    //페이지버튼
    let pageBox ='';
    if(map.pageVo.prev==true){
        pageBox +=`
      <a>
          <li class="page-num prev" value="${map.pageVo.startPage -1}>&lt</li>
        </a>
      `;
    }
    for(let i=map.pageVo.startPage; i<=map.pageVo.endPage; i++){
        if(i==map.pageVo.criteria.page){
            pageBox +=`
          <a>
          <li class="page-num active">${i}</li>
          </a>
          `;
        }else{
            pageBox +=`
          <a><li class="page-num">${i}</li></a>
          `;
        }
    }
    if(map.pageVo.next==true){
        pageBox +=`
      <a><li class="page-num next" value="${map.pageVo.endPage +1}">&gt</li></a>
      `;
    }

    $('.sub-list-body').html(list);
    $('.page-box').html(pageBox);
    // $('.service-name').text(productName);
    console.log("여기는까지 뷰인데 나오나?");
}
//=====================여기까지 showlist끝======================

//에러 코드
function showError(a, b, c) {
    console.error(c);
}

let globalProductNumber = 0;
let globalSearchInput = '';

// 검색 조건에 따른 구독자 조회
$('.search-btn-ct').on('click', '.search-btn',function (e) {
    period = $('input[name="period"]:checked').val();
   productNumber = $(e.target).closest('tr').find('.product-number').text();
  searchInput = $(e.target).closest('tr').find('.subscriber-input').text();
    productName = $(e.target).closest('tr').find('.product-name').text();
    let searchVo ={
        "page":page,
        // "globalSearchInput":searchInput,
        "subscriberInput":searchInput,
        "productName":productName,
        // "globalProductNumber":productNumber,
        "productNumber":productNumber,
        "period":period
    }

//     globalProductNumber = productNumber;
//     globalSearchInput = searchInput;
    sub.productSubsUserList(searchVo, showList, showError);
    console.log('나오니?');
    console.log(searchVo);
    console.log(period);
    $('.service-name').text(productName);
})

//기간 조건 클릭
$('.period-input').on('click','.period', function (){
    period = $('input[name="period"]:checked').val();

    let searchVo ={
        "page":page,
        "subscriberInput":globalSearchInput,
        "productNumber":productNumber,
        "productName":productName,
        "period":period,
        "globalProductNumber":productNumber
    }
    // globalProductNumber = productNumber;
    // globalSearchInput = searchInput;
    sub.productSubsUserList(searchVo, showList, showError);
    console.log("여기는 기간조건검색");
    $('.service-name').text(productName);

})

//페이징 처리 함수=====================================================================
//페이지버튼을 눌렀을 때
$('.page-box').on('click','.page-num',function(){
    if($(this).hasClass('next')){
        return;
    }
    if($(this).hasClass('prev')){
        return;
    }
    let page = $(this).text();

    let searchVo ={
        "page":page,
        "subscriberInput":globalSearchInput,
        "productNumber":productNumber,
        // "productName":productName,
        "period":period,
        "globalProductNumber":productNumber
    }
    sub.productSubsUserList(searchVo,showList,showError);
    $('.service-name').text(productName);
});
// 이전버튼 눌렀을 때
$('.page-box').on('click','.prev',function(){
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "subscriberInput":globalSearchInput,
        "productNumber":productNumber,
        // "productName":productName,
        "period":period,
        "globalProductNumber":productNumber
    }
    sub.productSubsUserList(searchVo,showList,showError);
    $('.service-name').text(productName);
});
//다음버튼 눌렀을 때
$('.page-box').on('click','.next',function(e){
    e.preventDefault();
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "subscriberInput":globalSearchInput,
        "productNumber":productNumber,
        // "productName":productName,
        "period":period,
        "globalProductNumber":productNumber
    }
    sub.productSubsUserList(searchVo,showList,showError);
    $('.service-name').text(productName);
});
//===============================================================================




//강제 구독 취소
$('.sub-list-body').on('click','.out-btn',function (){
   let subsNumber = $(this).closest('.subsNumber').data('num');
    let searchPeriod = $('input[name=period]:checked').val();
    console.log(subsNumber);
    console.log(subsNumber+"번 구독자 삭제 완료====================");
    sub.removeSubs(subsNumber, function (){
        sub.productSubsUserList({subscriberInput : globalSearchInput, productNumber : globalProductNumber, period : searchPeriod}, showList, showError);
    },showError);

    window.alert(['구독번호'+subsNumber+'번 구독 삭제되었습니다']);
});



// 버튼 클릭시 문자전송~~~~~~~~
$('.sub-list-body').on('click','.message-submit-btn',function (){
    console.log(this);
    let phoneNumber = $(this).data('phone').replace(/-/g,""); // 전화번호 가져오기
    /*phoneNumber.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);*/// 숫자를 제외한 모든 문자 제거
    console.log(phoneNumber);
    sendSMS(phoneNumber);
});

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
            alert('전송되었습니다.');
            console.log('SMS 전송 성공');
        },
        error: function(error) {
            console.log('SMS 전송 실패:', error);
        }
    });
}