import * as search from '../module/adminSearch.js';

//모듈 경로는 일반적으로 상대경로로 접근한다.

let page = 1;
let searchInput = '';
let searchSelect = '';

$(function (){
    searchSelect = $('.search-dropdown').val();
    searchInput = $('.search-input').val();
    let searchVo ={
        "page":page,
        "searchSelect":searchSelect,
        "searchInput":searchInput
    }
    search.getUserList(searchVo,showList,showError);
})

function showList(map) {
    console.log(map);
    if (map.userList.length == 0) {
        $('.empty').removeClass('none');
    } else {
        $('.empty').addClass('none');}

    let list = '';

    map.userList.forEach(u => {

        list += `
                <tr>
              <td class="user-number">${u.userNumber}</td>
              <td>${u.userName}</td>
              <td>
                <select name="parcel-status" class="parcel-status">
                  <option value="1" ${1 == u.userStatus ? `selected="selected"` : ''}>일반 회원</option>
                  <option value="0" ${0 == u.userStatus ? `selected="selected"` : ''}>탈퇴</option>
                </select>
              </td>
              <td>${u.userId}</td>
              <td>${u.userPhoneNumber}</td>
              <td>${u.userBirthday}</td>
              <td>${u.userEmail}</td>
              <td><button type="button" class="save-btn">save</button></td>
         
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

    $('.member-list-body').html(list);
    $('.page-box').html(pageBox);
}

//-----------------여기까지 showList함수 끝-----------------------


//에러 코드
function showError(a, b, c) {
    console.error(c);
}


// 검색 조건에 따른 회원 조회
$('.search-btn').on('click', function (){
    searchInput = $('.search-input').val();
    searchSelect = $('.search-dropdown').val();
    console.log(searchInput);
    console.log(searchSelect);
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect
    }
    search.getUserList(searchVo, showList, showError);
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
        "searchInput":searchInput,
        "searchSelect":searchSelect
    }
    search.getUserList(searchVo, showList, showError);

});
// 이전버튼 눌렀을 때
$('.page-box').on('click','.prev',function(){
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect
    }
    search.getUserList(searchVo, showList, showError);

});
//다음버튼 눌렀을 때
$('.page-box').on('click','.next',function(e){
    e.preventDefault();
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect
    }
    search.getUserList(searchVo, showList, showError);

});
//================================================================================


//회원 상태 변경
$('.member-list-body').on('click','.save-btn',function (){
    let userStatus = $(this).closest('tr').find('.parcel-status').val();
    let userNumber = $(this).closest('tr').find('.user-number').text();
    let userObj={
        userStatus:userStatus,
        userNumber:userNumber
    }
    console.log(userObj);
    console.log("==========회원상태변경 완료=========");
    search.userStatusAjax(userObj,showError);
    window.alert([userNumber+'번 저장되었습니다']);
});
//엔터처리==================================
$('.search-input').on('keydown', function (e){
    if(e.keyCode == 13){
        console.log('Enter');
        let searchInput = $('.search-input').val();
        let searchSelect = $('.search-dropdown').val();
        let searchVo ={
            "page":page,
            "searchInput":searchInput,
            "searchSelect":searchSelect
        }
        search.getUserList(searchVo, showList, showError);
    }
});