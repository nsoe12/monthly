package com.example.monthly.controller.admin;

import com.example.monthly.dto.SellerDto;
import com.example.monthly.service.admin.AdminService;
import com.example.monthly.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController //화면 전환 이뤄지지 않음
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/search/*")
public class RestSearchController {

    private final AdminService adminService;

//    //판매자 관리 페이지 기간별,조건별 전체 검색
//    @GetMapping("/sellers")
//    public List<SellerDto> searchSelect(String period, String searchSelect, String searchInput) {
//        SearchVo searchVo = new SearchVo();
//        searchVo.setSearchSelect(searchSelect);
//        searchVo.setPeriod(period);
//        searchVo.setSearchInput(searchInput);
//        System.out.println("============================");
//        System.out.println(searchVo);
//        return adminService.selectSeller(searchVo);
//    }

    //판매자 관리 페이지 기간별,조건별 전체 검색
    @GetMapping("/sellers/{page}")
    public Map<String, Object> searchSelect(SearchVo searchVo, @PathVariable("page") int page) {
        System.out.println("==============판매자 검색 페이징 진입==============");
        System.out.println(searchVo);
        Criteria criteria = new Criteria(page, 10);
        System.out.println(criteria+"=============");
        PageVo pageVo = new PageVo(criteria, adminService.sellerGetTotal(searchVo));
        List<SellerDto> sellerList = adminService.searchSelect(searchVo, criteria);

        System.out.println("===============판매자 검색 페이징 서비스 완료=============");
        Map<String, Object> sellerMap = new HashMap<>();
        sellerMap.put("pageVo",pageVo);
        sellerMap.put("sellerList",sellerList);
        return sellerMap;
    }


    //판매자 영업 상태 수정기능
    @PatchMapping("/{sellerStatus}")
    public void statusModify(@PathVariable("sellerStatus") int sellerStatus,
                             @RequestBody SellerDto sellerDto) {
        sellerDto.setSellerStatus(sellerStatus);
        adminService.statusModify(sellerDto);

    }

    //상품 카테고리별 검색 기능
    @GetMapping("/products")
    public List<ProductVo> searchProduct(String searchSelect, String searchInput) {
        SearchVo searchVo = new SearchVo();
        searchVo.setSearchSelect(searchSelect);
        searchVo.setSearchInput(searchInput);
        System.out.println("=============================");
        System.out.println(searchVo);
        return adminService.searchProduct(searchVo);
    }

    //상품 상태 수정기능
    @PatchMapping("/products/{productStatus}")
    public void goodsStModify(@PathVariable("productStatus") int productStatus,
                              @RequestBody ProductVo productVo) {
        productVo.setProductStatus(productStatus);
        adminService.goodsStModify(productVo);
    }


    //===========구독자 페이지===============

    @GetMapping("/subs")
    public List<SubsVo> productSubsUserList(SearchVo searchVo, Model model) {
        System.out.println("=========000000000===========");
        System.out.println(searchVo);
        return adminService.productSubsUserList(searchVo);
    }

    //구독자 삭제
    @DeleteMapping("/subs/{subsNumber}")
    public void subsModify(@PathVariable("subsNumber") Long subsNumber) {
        adminService.remove(subsNumber);
    }


    //==============전체 회원================
    @GetMapping("/users")
    public List<UserVo> searchUser(SearchVo searchVo, Model model) {
        System.out.println("==============회원검색드러가기===============");
        System.out.println(searchVo);
        return adminService.searchUser(searchVo);
    }
    //회원 상태 수정기능
    @PatchMapping("/users/{userStatus}")
    public void memberStModify(@PathVariable("userStatus") int userStatus,
                              @RequestBody UserVo userVo) {
        userVo.setUserStatus(userStatus);
        adminService.memberStModify(userVo);
    }

}
