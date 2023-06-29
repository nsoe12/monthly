package com.example.monthly.mapper;

import com.example.monthly.dto.AdminDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.dto.SellerDto;
import com.example.monthly.vo.AdminChartVo;
import com.example.monthly.vo.ProductVo;
import com.example.monthly.vo.SearchVo;
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


    //카테고리별 판매자 조회 검색
    List<SellerDto> selectSeller(SearchVo searchVo);

    //카테고리별 상품 검색
    List<ProductVo> searchProduct(SearchVo searchVo);



    List<AdminChartVo> sellerApplication();
    List<AdminChartVo> paymentCount();
}
