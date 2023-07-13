package com.example.monthly.controller.user;

import com.example.monthly.dto.ExSubsDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.service.user.MypageService;
import com.example.monthly.vo.SubsVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calender/*")
public class CalenderRestController {

    private final MypageService mypageService;

    //내부 구독 정보 출력
    @PostMapping("/subsList")
    public List<SubsVo> calSubsList(HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        List<SubsVo> subList = mypageService.subsFindAll(userNumber);
        return subList;
    }

//    외부 구독 정보 출력
    @PostMapping("/exSubsList")
    public List<ExSubsDto> calExSubsList(HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        List<ExSubsDto> ExSubList = mypageService.exSubsFindAll(userNumber);
        return ExSubList;
    }

    @PostMapping("/exSubsReigster")
    public String calExSubsInsert(HttpServletRequest req,@RequestBody ExSubsDto exSubsDto){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        exSubsDto.setUserNumber(userNumber);
        mypageService.exSubsRegister(exSubsDto);
        return "외부 구독 추가 성공";
    }


//    외부 구독 삭제
    @DeleteMapping("/exSubsRemove")
    public void exSubsRemove(@RequestBody ExSubsDto exSubsDto){
        System.out.println("lf--------------"+exSubsDto.toString());
        mypageService.exSubsRemove(exSubsDto);
    }

//    내부구독 취소
    @DeleteMapping("/subsRemove")
    public void subsRemove(@RequestBody ProductDto productDto, HttpServletRequest req){
        Long productNumber = mypageService.productSubs(productDto);
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        System.out.println(productNumber + "상품 번호=========================");
        System.out.println(userNumber + "회원 번호=========================");
        mypageService.subsRemove(productNumber,userNumber);
    }

}
