package com.example.monthly.service.user;

import com.example.monthly.dto.UserDto;
import com.example.monthly.mapper.UserMapper;
import com.example.monthly.vo.DeliveryVo;
import com.example.monthly.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserMapper userMapper;

    // 회원 가입
    public void register(UserVo userVo) {
        if (userVo == null) {
            throw new IllegalArgumentException("입력란 누락이나 조건이 충족되지 않음");
        }
        userMapper.insert(userVo);

    // 주소 입력란이 공백이 아닐 때만 주소를 추가
        if (!userVo.getUserPostcode().isEmpty() && !userVo.getUserAddress2().isEmpty()) {
            userMapper.insertAddress(userVo);
        }
    }


    // 회원 가입 아이디 중복 검사
    public int checkId(String userId){
        return userMapper.checkId(userId);
    }


    //  아이디 찾기
    public UserVo findId(UserVo userVo){
        if (userVo == null){ throw new IllegalArgumentException("입력란 누락이나 조건이 충족되지 않음"); }
        return userMapper.findId(userVo);
    }

    //  비밀번호 찾기
    public UserVo findPw(UserVo userVo){
        if (userVo == null){ throw new IllegalArgumentException("입력란 누락이나 조건이 충족되지 않음"); }
       return userMapper.findPw(userVo);
    }

    /**
     * 회원 번호 조회, 로그인(아이디, 패스워드)
     * @param userId
     * @param userPassword
     * @return
     * @throws IllegalArgumentException 존재하지 않는 회원 id, pw로 조회하는 경우
     */
    @Transactional(readOnly = true)
    public Long userLogin(String userId, String userPassword) {
        if (userId == null || userPassword == null) {
            throw new IllegalArgumentException("아이디, 패스워드 누락!");
        }
        return Optional.ofNullable(userMapper.userLogin(userId, userPassword))
                .orElseThrow(() -> {
                    throw new IllegalArgumentException("존재하지 않는 회원입니다.");
                });
    }

    /**
     * 회원 번호 조회, 로그인(아이디, 패스워드)
     * @param userId
     * @return
     * @throws IllegalArgumentException 존재하지 않는 회원 id, pw로 조회하는 경우
     */
    @Transactional(readOnly = true)
    public Long apiUserLogin(String userId) {
        if (userId == null) {
            throw new IllegalArgumentException("아이디 누락!");
        }
        return Optional.ofNullable(userMapper.apiUserLogin(userId))
                .orElseThrow(() -> {
                    throw new IllegalArgumentException("존재하지 않는 회원입니다.");
                });
    }

    //회원번호로 회원 전체 조회
    public DeliveryVo findAll(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        return userMapper.selectAll(userNumber);
    }

    //비밀번호 수정
    public void updatePassword(UserDto userDto){
        if (userDto == null) {
            throw new IllegalArgumentException("비밀번호, 회원 번호 누락");
        }
        userMapper.updatePassword(userDto);
    }

    //회원 상태 변경
    public void changeStatus(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        System.out.println(userNumber +"service");
        userMapper.userWithdraw(userNumber);
    }

    // 네이버 회원 등록
    public void registerNaverUser(UserVo userVo) {
        if (userVo == null) {
            throw new IllegalArgumentException("네이버 회원 정보가 없습니다.");
        }

        // 중복된 ID인 경우 로그인 처리
        if (checkId(userVo.getUserId()) > 0) {
            apiUserLogin(userVo.getUserId());
            return;
        }

        // 서버로부터 받은 네이버 사용자 정보를 UserService를 통해 처리
        System.out.println("Received Naver User Info:");
        System.out.println("ID: " + userVo.getUserId());
        System.out.println("Name: " + userVo.getUserName());
        System.out.println("Email: " + userVo.getUserEmail());
        System.out.println("Mobile: " + userVo.getUserPhoneNumber());
        System.out.println("Gender: " + userVo.getUserGender());
//        System.out.println("Birthday: " + userVo.getUserBirthday());

        // 사용자 정보 처리 후, 로직을 수행하거나 응답을 반환
        try {
            userMapper.insertNaver(userVo);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to process Naver login information.");
        }
    }

    public void registerKakaoUser(UserVo userVo) {
        if (userVo == null) {
            throw new IllegalArgumentException("카카오 회원 정보가 없습니다.");
        }

        // 중복된 ID인 경우 로그인 처리
        if (checkId(userVo.getUserId()) > 0) {
            apiUserLogin(userVo.getUserId());
            return;
        }

        // 받은 사용자 정보를 처리하는 로직을 구현
        System.out.println("Received Kakao user information:");
        System.out.println("ID: " + userVo.getUserId());
        System.out.println("Email: " + userVo.getUserEmail());
        System.out.println("Gender: " + userVo.getUserGender());
        System.out.println("Nickname: " + userVo.getUserName());

        // 사용자 정보 처리 후, 로직을 수행하거나 응답을 반환
        try {
            userMapper.insertKakao(userVo);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to process Kakao login information.");
        }
    }
}