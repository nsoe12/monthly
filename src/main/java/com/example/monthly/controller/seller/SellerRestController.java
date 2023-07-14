package com.example.monthly.controller.seller;

import com.example.monthly.dto.ParcelDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.dto.ProductFileDto;
import com.example.monthly.dto.SellerDto;
import com.example.monthly.service.board.ParcelService;
import com.example.monthly.service.board.ProductFileService;
import com.example.monthly.service.board.ProductService;
import com.example.monthly.service.seller.SellerService;
import com.example.monthly.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/*")
public class SellerRestController {
    private final SellerService sellerService;
    private final ProductService productService;
    private final ProductFileService productFileService;
    private final ParcelService parcelService;

//  판매자아이디 중복검사
    @GetMapping("/checkId")
    public int checkId(String sellerId){
        return sellerService.sellerIdCheck(sellerId);
    }
//    판매자 현재 비밀번호 확인
    @GetMapping("/checkPw")
    public int checkPassword(String sellerPassword, HttpServletRequest req){
        Long sellerNumber =  (Long)req.getSession().getAttribute("sellerNumber");
        return sellerService.checkCurrentPw(sellerNumber, sellerPassword);
    }
    @PatchMapping("/modifyInfo")
    public void modifySellerInfo(@RequestBody SellerDto sellerDto, HttpServletRequest req ){
        Long sellerNumber = (Long)req.getSession().getAttribute("sellerNumber");
        sellerDto.setSellerNumber(sellerNumber);
        sellerService.modifySellerInfo(sellerDto);
    }
    @GetMapping("/findInfo")
    public SellerDto findSellerInfo(HttpServletRequest req){
        Long sellerNumber =  (Long)req.getSession().getAttribute("sellerNumber");
        return sellerService.findSellerInfo(sellerNumber);
    }

//    상품전체리스트
/*    @GetMapping("/list")
    public List<ProductVo> list(HttpServletRequest req){
        System.out.println("===============$$$$$$$/list/");
        Long sellerNumber = (Long) req.getSession().getAttribute("sellerNumber");
        return productService.findAllProduct(sellerNumber);}*/

//      제품리스트조회+ 페이징처리
    @GetMapping("/list/{page}")
    public Map<String, Object> productListPage(HttpServletRequest req, @PathVariable("page")int page) {
        Long sellerNumber = (Long) req.getSession().getAttribute("sellerNumber");
        Criteria criteria = new Criteria(page, 10);
        PageVo pageVo = new PageVo(criteria, productService.getTotal(sellerNumber));
        List<ProductVo> productList = productService.findListPage(criteria, sellerNumber);
        Map<String, Object> productMap = new HashMap<>();
        System.out.println("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        productMap.put("pageVo", pageVo);
        System.out.println("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        System.out.println(pageVo);
        productMap.put("productList", productList);
        return productMap;
    }

//    검색조건넣어서 제품조회
    @GetMapping("/searchP/{page}")
    public Map<String, Object> searchProduct(HttpServletRequest req, SearchVo searchVo, @PathVariable("page")int page){
        System.out.println("===============검색 restController진입=====================");
        System.out.println(searchVo);
        Long sellerNumber = (Long) req.getSession().getAttribute("sellerNumber");
        Criteria criteria = new Criteria(page, 10);
        PageVo pageVo = new PageVo(criteria, productService.getSearchTotal(sellerNumber,searchVo));
        List<ProductVo> productList = productService.searhProduct(sellerNumber, searchVo, criteria);
        Map<String, Object> productMap = new HashMap<>();
        productMap.put("pageVo",pageVo);
        productMap.put("productList",productList);
        return productMap;
    }

//  제품 정보수정-어디서쓴거징??
    @GetMapping("/modify")
    public List<ProductFileDto> files(Long productNumber){
        List<ProductFileDto> files = productFileService.getProductFileList(productNumber);
        return files;
    }

    @GetMapping("/main/{page}")
    public Map<String, Object> findParcelList(HttpServletRequest req, SearchVo searchVo, @PathVariable("page")int page) {
        System.out.println("===============검색 restController진입=====================");
        System.out.println(searchVo);
        Long brandNumber = (Long) req.getSession().getAttribute("brandNumber");
        System.out.println("$$$$$$$$$$%%%%%%%%%%%%%%%%$$$$$$$$$$$$$$$$");
        System.out.println(brandNumber);
        Criteria criteria = new Criteria(page, 15);
        System.out.println("$$$$$$$$$$$$$$$$$$$$"+ criteria);
        PageVo pageVo = new PageVo(criteria, parcelService.findParcelTotal(brandNumber, searchVo));
        List<ParcelVo> parcelList = parcelService.findParcelList(searchVo, criteria, brandNumber);
        Map<String, Object> parcelMap = new HashMap<>();
        parcelMap.put("pageVo", pageVo);
        parcelMap.put("parcelList", parcelList);
        return parcelMap;
    }

//    리스트에서 제품판매상태수정
    @PatchMapping("/pStatus")
    public void modifyStatus(@RequestBody ProductDto productDto){
        System.out.println(productDto);
        productService.modifyStatus(productDto);
    }

//    메인리스트에서 주문배송정보등수정
    @PatchMapping("/mParcel")
    public void modifyParcel(@RequestBody ParcelDto parcelDto){
        parcelService.modifyParcel(parcelDto);
    }
}
