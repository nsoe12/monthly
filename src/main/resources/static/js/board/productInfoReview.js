import * as review from '../module/review.js';

let productNumber = $('#productNumber').val();
let page = 1;
console.log("제품번호:"+productNumber);

review.getListPage({productNumber : productNumber, page : page}, showReply, showError);

function showError(a, b, c){
    console.error(c);
}

//조회
function showReply(map) {
    console.log(map);

    let text = '';

    console.log(map.pageInfo);

    for(let i =0;i < map.pageInfo.endPage;i++){

    }
    let pageBox ='';
    pageBox+=`
            <div class="page-container">
            <ul class="page-box">
            `;
            if(map.pageInfo.prev == true){
                $('.prev').val(map.pageInfo.startPage-1)
                pageBox+=`
                    <a  class="page-a"">
                     <li value="${map.pageInfo.startPage - 1}" class="page-num prev">&lt</li>
                `;
            }

    for(let i = map.pageInfo.startPage;i <= map.pageInfo.endPage;i++){
        if(i == map.pageInfo.criteria.page){

        pageBox+=
        `
                    <a  class="page-a">
                        <li class="page-num active">${i}</li>
                       
                    </a>
                
 
        `;
        }else {
            pageBox+=
                `
                    <a  class="page-a">
                        
                        <li class="page-num" >${i}</li>
                    </a>
                
        
        `;

        }
    }

    if(map.pageInfo.next == true){

        pageBox+=`
                    <a class="page-a">
                    <li value="${map.pageInfo.endPage +1}" class="page-num next">&gt</li>
                </a>
            </ul>
        </div>
        `;
    }

    map.reviewList.forEach(r => {
        text += `
        <li class="commentItem-commentContainer" data-num="${r.reviewNumber}">
                              <section
                                class="commentItem-CommentHeader"
                                style="width: 102%"
                              >
                                <div class="commentItem-writerWrapper">
                                  <div class="commentItem-commentInfo">
                                    <div class="commentItem-title" >
                                      <div class="commentItem-userNickname">
                                        ${r.userId}
                                      </div>
                                      <div class="commentItem-registerDate">
                                        ${review.timeForToday(r.reviewRegisterDate == r.reviewUpdateDate ? r.reviewRegisterDate : r.reviewUpdateDate)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
        `;

        /*userNumber productinfo.html에서 받아와서 여기에 2 대신 넣어주면 된다.*/
        if(r.userNumber == loginNumber){
            text += `


                               <div class="boardReply-editDelete">
                                  <button
                                    type="button"
                                    class="boardReply-editor-buttons"
                                    style="
                                      background-color: #8eb4c8;
                                      border-radius: 20px;
                                      width: 50px;
                                    "
                                  >
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    class="boardReply-remove-buttons"
                                    style="
                                      background-color: #8eb4c8;
                                      border-radius: 20px;
                                      width: 50px;
                                    "
                                  >
                                    삭제
                                  </button>
                                </div>`;

                                }

                              text+=`
                              </section>
                              <section class="commentItem-CommentContent">
                                <p class="CommentContent">
                                    ${r.reviewContents}
                                </p>
                              </section>
                            </li>
                            

        
        `;


    });

    $('.commentList-CommentList').html(text+pageBox);


}


//댓글 추가처리
$('.commentInput-buttonComplete').on('click',function(){
   let content = $('.commentInput-commentText').val();
   console.log(content);

   let reviewObj = {
       reviewContents : content,
       productNumber : productNumber,
   }

   review.add(reviewObj,
       function (){
        review.getListPage({productNumber : productNumber, page : page},showReply,showError);

       },showError());

   $('.commentInput-commentText').val('');
});



// 리플 삭제 버튼 처리
$('.commentList-CommentList').on('click', '.boardReply-remove-buttons', function () {
    $('.boardReply-editDelete').addClass('none');

    let reviewNumber = $(this).closest('.commentItem-commentContainer').data('num');
    console.log(reviewNumber);
    page = 1;

    review.remove(reviewNumber, function(){
        review.getListPage({productNumber : productNumber, page : page}, showReply, showError);
    }, showError);
});

// 리플 수정 버튼 처리
$('.commentList-CommentList').on('click', '.boardReply-editor-buttons', function () {
    console.log("수정 버튼 누름");
    let $content = $(this).closest('.commentItem-commentContainer').find('.commentItem-CommentContent');
    console.log($content);
    $content.replaceWith(`
  <div class='modify-box'>
    <textarea class='modify-content'>${$content.text().trim()}</textarea>
    <button type='button' class='modify-content-btn'>수정 완료</button>
  </div>
  `);
    $('.boardReply-editDelete').addClass('none');
});


// 리플 수정 완료 처리
$('.commentList-CommentList').on('click', '.modify-content-btn', function () {
    // console.log('modify!!!');
    let replyNumber = $(this).closest('.commentItem-commentContainer').data('num');
    let replyContent = $(this).closest('.modify-box').find('.modify-content').val();

    console.log(replyContent);
    console.log(replyNumber);
    let replyObj = {
        reviewNumber : replyNumber,
        reviewContents : replyContent,
    }

    page = 1;

    review.modify(replyObj, function (){
        review.getListPage({productNumber : productNumber, page : page}, showReply, showError);
    }, showError);
});

//페이징


$('.commentList-CommentList').on('click','.page-num',function (){
    if($(this).hasClass('next')){
        return;
    }
    if($(this).hasClass('prev')){
        return;
    }
    console.log("페이징 버튼 눌림")
    let page = $(this).text();
    console.log(page+"page")
    review.getListPage({productNumber : productNumber, page : page}, showReply, showError);

});

$('.commentList-CommentList').on('click','.prev',function (){
    let page = $(this).val();
    console.log(page+"page");
    review.getListPage({productNumber : productNumber, page : page}, showReply, showError);
});

$('.commentList-CommentList').on('click','.next',function (e){
    e.preventDefault();
    console.log("next눌림")
    let page = $(this).val();
    console.log(page+"page");
    review.getListPage({productNumber : productNumber, page : page}, showReply, showError);
});

