import * as search2 from '../module/adminSearch.js';

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
    search2.getProductList(searchVo,showPdl,showError);
})

function showPdl(map2){
    if (map2.productList.length == 0) {
        $('.empty').removeClass('none');
    } else {
        $('.empty').addClass('none');}

    console.log(map2);
    let list = '';

    map2.productList.forEach(i => {
        list += ` 
              <tr><!--상품관리 리스트 #1-->
              <td class="product-number">${i.productNumber}</td>
              <td>${i.productName}</td>
              <td>
                <select name="parcel-status" class="parcel-status">
                  <option value="1" ${1==i.productStatus ? `selected="selected"`:''}>판매 중</option>
                  <option value="0" ${0==i.productStatus ? `selected="selected"`:''}>판매 종료</option>
                </select>
              </td>
              <td>${i.brandName}</td>
              <td>${i.productRegisterDate}</td>
              <td>${i.sellerPhoneNumber}</td>
              <td>${i.sellerEmail}</td>
              <td>${i.sellerName}</td>
              <td><button type="button" class="save-btn">save</button></td>
          </tr>`;
    });
    //====================여기 띄우는 곳인데 페이지버튼 띄우는 html view===============
    //페이지버튼
    let pageBox ='';
    if(map2.pageVo.prev==true){
        pageBox +=`
      <a>
          <li class="page-num prev" value="${map2.pageVo.startPage -1}>&lt</li>
        </a>
      `;
    }
    for(let i=map2.pageVo.startPage; i<=map2.pageVo.endPage; i++){
        if(i==map2.pageVo.criteria.page){
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
    if(map2.pageVo.next==true){
        pageBox +=`
      <a><li class="page-num next" value="${map2.pageVo.endPage +1}">&gt</li></a>
      `;
    }

    $('.goods-list-body').html(list);
    $('.page-box').html(pageBox);
}
//-----------------여기까지 productPdl함수 끝-----------------------

function showError(a, b, c) {
    console.error(c);
}

//검색 조건에 따른 상품 조회
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
    search2.getProductList(searchVo, showPdl, showError);
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
    search2.getProductList(searchVo,showPdl,showError);

});
// 이전버튼 눌렀을 때
$('.page-box').on('click','.prev',function(){
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect
    }
    search2.getProductList(searchVo,showPdl(),showError);

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
    search2.getProductList(searchVo,showPdl,showError);

});
//================================================================================

//상품 상태 변경
$('.goods-list-body').on('click','.save-btn',function (){
    let productStatus = $(this).closest('tr').find('.parcel-status').val();
    let productNumber = $(this).closest('tr').find('.product-number').text();
    let pstObj={
        productStatus:productStatus,
        productNumber:productNumber
    }
    console.log(pstObj);
    console.log("==========0000000000000000000000");
    search2.productStatusAjax(pstObj,showError);
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
        search2.getProductList(searchVo, showPdl, showError);

    }
});