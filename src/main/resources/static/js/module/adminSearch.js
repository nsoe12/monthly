//adminSearch.js는 manager_seller.js의 모듈을 만들어두는 파일
//이 모듈을 밖에서 사용할 수 있도록 내보내는 키워드가 export이다.

//판매자 검색 기능 모듈
// export function getList(obj, callback,error){
//     $.ajax({
//         url : '/search/sellers',
//         type : 'get',
//         data : obj,
//         dataType : 'json',
//         success : function(map){
//             if(callback){
//         callback(map);
//             }
//         },
//         error : error
//     });
// }
//판매자 검색후 상태변경 기능 모듈
export function sellerStatusAjax(statusObj,error) {
    $.ajax({
        url: `/search/${statusObj.sellerStatus}`,
        type: 'patch',
        data:  JSON.stringify(statusObj),
        contentType : 'application/json; charset=utf-8',
        success: function(){
            console.log('주문상태변경 ajax연결 성공');
        },
        error:error
    });
}
//상품검색페이지 검색 모듈
export function getProductList(pdl, callback,error){
    $.ajax({
        url : '/search/products',
        type : 'get',
        data :  pdl,
        dataType : 'json',
        // contentType : 'application/json; charset=utf-8',
        success : function(result){
            console.log('ㄹㄴㅇㄹㄴㄹㅇㄹㅇㄴㄹㅋㄹㅋㄴㅇㄹ');
            console.log(result);
            if(callback){
                callback(result);
            }
        },
        error : error
    });
}
//전체 회원 페이지 검색 모듈
export function getUserList(ul, callback,error){
    $.ajax({
        url : '/search/users',
        type : 'get',
        data :  ul,
        dataType : 'json',
        // contentType : 'application/json; charset=utf-8',
        success : function(result){
            console.log('ㄹㄴㅇㄹㄴㄹㅇㄹㅇㄴㄹㅋㄹㅋㄴㅇㄹ');
            console.log(result);
            if(callback){
                callback(result);
            }
        },
        error : error
    });
}
//회원 검색후 상태변경 기능 모듈
export function userStatusAjax(userObj,error) {
    $.ajax({
        url: `/search/users/${userObj.userStatus}`,
        type: 'patch',
        data:  JSON.stringify(userObj),
        contentType : 'application/json; charset=utf-8',
        success: function(){
            console.log('회원상태변경 ajax연결 성공');
        },
        error:error
    });
}





//상품 상태변경
export function productStatusAjax(pstObj,error){
    $.ajax({
        url: `/search/products/${pstObj.productStatus}`,
        type: 'patch',
        data:  JSON.stringify(pstObj),
        contentType : 'application/json; charset=utf-8',
        success: function(){
            console.log('판매상태변경 ajax연결 성공');
        },
        error:error
    });
}







//=============================================================


//판매자의 구독자 페이지 검색 후 구독자 리스트 모듈
export function productSubsUserList(psl,callback,error){
    $.ajax({
        url : '/search/subs',
        type : 'get',
        data :  psl,
        dataType : 'json',
        success : function(result){
            console.log('검색~~~~~ 드러가기');
            console.log(result);
            if(callback){
                callback(result);
            }
        },
        error : error
    });
}

//강제 구독 취소
export function removeSubs(subsNumber,callback,error){
    $.ajax({
        url: `/search/subs/${subsNumber}`,
        type: 'delete',
        success: function(){
            console.log('구독상태변경 ajax연결 성공');
            if (callback){
                callback();
            }
        },
        error:error
    });
}


export function getList(searchVo,callback,error){
    $.ajax({
        url : `/search/sellers/${searchVo.page}`,
        type : 'get',
        data : searchVo,
        dataType : 'json',
        success : function(result){
            if(callback){
                console.log(result);
                callback(result)
            }
        },
        error:error
    });
}



