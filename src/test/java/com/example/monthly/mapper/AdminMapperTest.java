package com.example.monthly.mapper;

import com.example.monthly.dto.BrandDto;
import com.example.monthly.dto.PaymentDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.dto.SellerDto;
import com.example.monthly.vo.AdminChartVo;
import com.example.monthly.vo.ProductVo;
import com.example.monthly.vo.SearchVo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
class AdminMapperTest {
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private SearchVo searchVo;
    private SellerDto sellerDto;
    private AdminChartVo adminChartVo;
    private PaymentDto paymentDto;
    private ProductDto productDto;
    private BrandDto brandDto;
    private ProductVo productVo;

    @BeforeEach
    void setUp(){
        sellerDto = new SellerDto();
       productVo = new ProductVo();
        productDto = new ProductDto();
        brandDto = new BrandDto();
        productVo.setProductName("상품11");
        productVo.setProductAmount(1L);
        productVo.setProductOption("ㅇㅁㄴㅇㄹ옵션");
        productVo.setBrandName("브랜드이름");
        productVo.setProductRegisterDate("2312-11-11");
        productVo.setProductPrice("2000원");
        productVo.setProductContents("콘텐츠다ㅏㅏㅏ");
        productVo.setProductStatus(1);
        productVo.setSellerName("판매자이름");
        productVo.setSellerEmail("email.com");
        productVo.setSellerPhoneNumber("010-2222-1111");
        productVo.setBrandNumber(1L);
        productVo.setSellerNumber(1L);
        productVo.setUserNumber(1L);
    }


    @Test
    void sellerApplication() {
        List<AdminChartVo> admin= adminMapper.sellerApplication();
        //log.info(admin.get(0).getRegistarionCount()+"===============================");
    }

    @Test
    void paymentCount() {
        List<AdminChartVo> adminChartList = adminMapper.paymentCount();
        for (AdminChartVo adminChart : adminChartList) {
            System.out.println(adminChart.getPaymentDate() + ": " + adminChart.getPaymentPriceCount());
        }
    }

//    @Test
//    @DisplayName("동적쿼리 테스트 빈문자열로 해당 값들 조회하기")
//    void selectSeller() {
//        adminMapper.insert(sellerDto);
//        searchVo = new SearchVo();
//        searchVo.setPeriod("");
//        searchVo.setSearchSelect("seller-Name");
//        searchVo.setSearchInput("박은서5");
//        List<SellerDto> list = adminMapper.selectSeller(searchVo);
//        System.out.println(list);
//
//    }
//    @Test
//    @DisplayName("상품검색 조회")
//    void searchProduct(){
//        adminMapper.insertProduct(productVo);
//        searchVo = new SearchVo();
//        searchVo.setSearchSelect("goods-name");
//        searchVo.setSearchInput("상품11");
//        List<ProductVo> list=adminMapper.searchProduct(searchVo);
//        System.out.println(list);
//    }

    @Test
    void update(){
        adminMapper.insert(sellerDto);
        sellerDto.setSellerStatus(3);
        adminMapper.update(sellerDto);

        System.out.println("==========================="+sellerDto);
    }
}