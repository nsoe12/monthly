package com.example.monthly.controller.user;


import com.example.monthly.dto.DeliveryDto;
import com.example.monthly.dto.ExSubsDto;
import com.example.monthly.dto.UserDto;
import com.example.monthly.mapper.SubsMapper;
import com.example.monthly.service.order.OrderService;
import com.example.monthly.service.user.MypageService;
import com.example.monthly.service.user.UserService;
import com.example.monthly.vo.DeliveryVo;
import com.example.monthly.vo.SubsVo;
import com.example.monthly.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


// 로그인, 회원가입, 정보수정 등
@Controller
@RequiredArgsConstructor
@RequestMapping("/user/*")
public class UserController {
    private final UserService userService;

    private final OrderService orderService;

    private final MypageService mypageService;

    @GetMapping("/mypage")
    public String mypage(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        int subsPrice = 0;
        int exPrice = 0;
        List<SubsVo> subs = mypageService.subsFindAll(userNumber);
        System.out.println("=====================================================");
        System.out.println(subs.toString());
        System.out.println("=====================================================");
        for(int i =0 ; i < subs.toArray().length; i++){
            String str = subs.get(i).getSubsStartDate().substring(0,10);
            subs.get(i).setSubsStartDate(str);
            subsPrice += Integer.valueOf(subs.get(i).getPaymentPrice());
        }
        model.addAttribute("subs",subs);

//        외부 구독
        List<ExSubsDto> exSubs = mypageService.exSubsFindAll(userNumber);
        if (!exSubs.isEmpty()) {
            for (int i = 0; i < exSubs.size(); i++) {
                exPrice += Integer.valueOf(exSubs.get(i).getExSubsPrice());
            }
        }
        int subsCnt = mypageService.exSubsCnt(userNumber) +mypageService.subsCnt(userNumber);

        model.addAttribute("subsPrice",subsPrice);
        model.addAttribute("exPrice",exPrice);
        model.addAttribute("exSubs",exSubs);
        model.addAttribute("subsCnt",subsCnt);
        return "user/mypage";
    }




    @GetMapping("/userModify")
    public String userModify(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        DeliveryVo user = userService.findAll(userNumber);
        model.addAttribute("user",user);
        return "user/userModify";
    }

    @PostMapping("/userModify")
    public RedirectView userModify(UserDto userDto, DeliveryDto deliveryDto, @Param("checkPassword") String checkPassword, HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
       userDto.setUserNumber(userNumber);
       userDto.setUserPassword(checkPassword);
        if(checkPassword.length() != 0){
           userService.updatePassword(userDto);
       }
       //배송지 수정 (세션에서 받아온 userNumber 넣기)
       deliveryDto.setUserNumber(userNumber);

        System.out.println(deliveryDto);

       if(userService.findAll(userNumber).getDeliveryPostcode() != null){
           orderService.changeDelivery(deliveryDto);
       }else {
            orderService.registerDelivery(deliveryDto);

       }

        return new RedirectView("/user/mypage");

    }

    @GetMapping("/changeStatus")
    public RedirectView userWithdraw(HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        userService.changeStatus(userNumber);
        return new RedirectView("/user/login");
    }


// 로그인
    @GetMapping("/login")
    public String login(){
        return "user/login"; }

    @PostMapping("/login")
    public RedirectView login(String userId, String userPassword, HttpServletRequest req, RedirectAttributes attributes) {
        try {
            Long userNumber = userService.userLogin(userId, userPassword);
            req.getSession().setAttribute("userNumber", userNumber);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            attributes.addFlashAttribute("loginError", true);
            attributes.addFlashAttribute("errorMessage", "아이디나 비밀번호가 올바르지 않습니다. 다시 시도해주세요.");
            return new RedirectView("/user/login");
        }

        return new RedirectView("/board/main");
    }


//    회원가입
    @GetMapping("/join")
    public String join(){
        return "user/join"; }

    @PostMapping("/joinOK")
    public String joinOK(UserVo userVo, Model model) {
        userService.register(userVo);
        model.addAttribute("user", userVo);
        return "user/join_ok";
    }

//    아이디 찾기
    @GetMapping("/findId")
    public String findId(){
        return "user/find_id"; }

    @PostMapping("/findIdOK")
    public String findIdOK(UserVo userVo, Model model) {
        UserVo user = userService.findId(userVo);
        if (user == null) {
            model.addAttribute("notFound", true);
        } else {
            model.addAttribute("user", user);
        }
        return "user/find_id_ok";
    }


    //    비밀번호 찾기
    @GetMapping("/findPw")
    public String findPw(){
        return "user/find_pw"; }

    @PostMapping("/findPwOK")
    public String findPwOK(UserVo userVo, Model model){
        UserVo user = userService.findPw(userVo);
        if (user == null) {
            model.addAttribute("notFound", true);
        } else {
            model.addAttribute("user", user);
        }
        return "user/find_pw_ok"; }

}
