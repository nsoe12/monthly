import * as search from '../module/adminSearch.js';

//모듈 경로는 일반적으로 상대경로로 접근한다.
// let page = 1;
// let searchInput = '';
// let searchSelect = '';
// let period = '';
// $(function (){
//     searchInput = $('.search-input').val();
//     searchSelect = $('.search-dropdown').val();
//     period = $('input[name="period"]:checked').val();
//     let searchVo ={
//         "page":page,
//         "searchInput":searchInput,
//         "searchSelect":searchSelect,
//         "period":period
//     }
//     console.log(searchVo);
//     search.getList(searchVo,showList,showError);
// })

// 검색 조건에 따른 회원 조회
$('.search-btn').on('click', function (){
    let searchInput = $('.search-input').val();
    let searchSelect = $('.search-dropdown').val();
    let period = $('input[name="period"]:checked').val();
    let page = 1;
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period
    }
    console.log('==============여기냐??========');
    search.getList(searchVo, showList, showError);
    console.log('==============여기냐??22222222========');
})

function showList(map) {
    if (map.sellerList.length == 0) {
        $('.empty').removeClass('none');
    } else {
        $('.empty').addClass('none');}

    console.log(map);
    let list = '';

    map.sellerList.forEach(u => {
        list += `
        <tr> <!--판매자 리스트 띄움 ajax처리 #1-->
            <td class="seller--number">${u.sellerNumber}</td>
            <td>${u.sellerName}</td>
            <td>
                <select name="parcel-status"  class="parcel-status">
                    <option value="1" ${1==u.sellerStatus ? `selected="selected"`:''}  >영업신청</option>
                    <option value="2" ${2==u.sellerStatus ? `selected="selected"`:''}>영업허가</option>
                    <option value="0" ${0==u.sellerStatus ? `selected="selected"`:''}>폐업</option>
                </select>
            </td>
            <td>${u.sellerId}</td>
            <td>${u.sellerPhoneNumber}</td>
            <td>${u.sellerRegisterDate}</td>
            <td>${u.sellerCompanyRegisterNumber}</td>
            <td>${u.sellerEmail}</td>
            <td>${u.sellerAddress1}</td>
            <td>

                <button type="button" class="brand-link" data-seller-number="${u.sellerNumber}"> 브랜드 이동</button>   
            </td>
            <td><button type="button" class="save-btn">save</button></td>
        </tr>`;
    });

    //====================
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

    $('.seller-list-body').html(list); //=============
    $('.page-box').html(pageBox);

}
// search.getList({period : '', searchSelect : '', searchInput:''}, showList, showError);

//페이징 처리 =====================================================================
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
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period
    }
    search.getList(searchVo,showList,showError);

});
// 이전버튼 눌렀을 때
$('.page-box').on('click','.prev',function(){
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period
    }
    search.getList(searchVo,showList,showError);

});
//다음버튼 눌렀을 때
$('.page-box').on('click','.next',function(e){
    e.preventDefault();
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period
    }
    search.getList(searchVo,showList,showError);

});
//================================================================================





//구독자 페이지로 버튼 누르면 이동
$('.seller-list-body').on('click','.brand-link',function (){
    let sellerNumber = $(this).data('seller-number');
// Perform the page redirect based on sellerNumber
    window.location.href = `/admin/subMember?sellerNumber=${sellerNumber}`;
});

//에러 코드
function showError(a, b, c) {
    console.error(c);
}


// // 검색 조건에 따른 회원 조회
// $('.search-btn').on('click', function (){
//     let searchInput = $('.search-input').val();
//     let searchSelect = $('.search-dropdown').val();
//     let period = $('input[name=period]:checked').val();
//
//     let searchVo ={
//         "page":page,
//         "searchInput":searchInput,
//         "searchSelect":searchSelect,
//         "period":period
//     }
//     console.log('==============여기냐??========');
//     search.getList(searchVo, showList, showError);
//     console.log('==============여기냐??22222222========');
// })

//판매자 상태 변경
$('.seller-list-body').on('click', '.save-btn', function() {
    // 해당 회원번호, 바꿔야 하는 상태
    let sellerStatus = $(this).closest('tr').find('.parcel-status').val();
    let sellerNumber = $(this).closest('tr').find('.seller--number').text();
    let statusObj={
        sellerStatus : sellerStatus,
        sellerNumber : sellerNumber
    }
    console.log(statusObj);
    search.sellerStatusAjax(statusObj,showError);
});





//엔터처리==================================
$('.search-input').on('keydown', function (e){
    if(e.keyCode == 13){
        console.log('Enter');
        let searchInput = $('.search-input').val();
        let searchSelect = $('.search-dropdown').val();
        let period = $('input[name=period]:checked').val();

        let searchVo ={
            "page":page,
            "searchInput":searchInput,
            "searchSelect":searchSelect,
            "period":period
        }
        search.getList(searchVo, showList, showError);

    }
});