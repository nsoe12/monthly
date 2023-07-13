package com.example.monthly.mapper;

import com.example.monthly.dto.AdminDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.dto.SellerDto;
import com.example.monthly.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface AdminMapper {
    public void insert(SellerDto sellerDto); //판매자 검색 인서트
    public void insertProduct(ProductVo productVo); //상품검색 인서트

    Long findAdminNumber(@Param("adminId")String adminId, @Param("adminPassword")String adminPassword);

    public void update(SellerDto sellerDto); //판매자 상태변경
    public void updateProduct(ProductVo productVo); //상품 판매상태 변경
    public void updateUsers(UserVo userVo); //회원 상태 변경
   public void deleteSubs(Long subsNumber);//구독취소


    //카테고리별 판매자 조회 검색
//    List<SellerDto> selectSeller(SearchVo searchVo);
    List<SellerDto> selectSeller(@Param("searchVo")SearchVo searchVo, @Param("criteria")Criteria criteria);
    int sellerGetTotal(@Param("searchVo")SearchVo searchVo);

    //카테고리별 상품 검색
    List<ProductVo> searchProduct(SearchVo searchVo);

    //카테고리별 유저 검색
    List<UserVo> searchUser(SearchVo searchVo);


    //판매자이동 후 해당 브랜드의 상품들, 구독자 수만 조회 #1
    List<ProductVo> selectSubUser(Long sellerNumber);
    List<ProductVo> brandName(Long sellerNumber);

    //판매자 이동 후 상품별 구독자 정보 가져오기 #3
    List<SubsVo> productSubsUserList(SearchVo searchVo);


    List<AdminChartVo> sellerApplication();
    List<AdminChartVo> paymentCount();

    // 신청현황
    List<AdminChartVo> getSellerStatusByDate();
    List<AdminChartVo> sellerMonth();
    List<AdminChartVo> threeAverage();

}
