package com.example.monthly.service.user;

import com.example.monthly.dto.ExSubsDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.mapper.SubsMapper;
import com.example.monthly.vo.SubsVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {

    private final SubsMapper subsMapper;

//    내부 구독 정보 출력
    public List<SubsVo> subsFindAll(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        return subsMapper.subsSelect(userNumber);
    }

//    외부 구독 추가
    public void exSubsRegister(ExSubsDto exSubsDto){
        if (exSubsDto == null) {
            throw new IllegalArgumentException("외부 구독 정보 누락");
        }
        subsMapper.exSubsInsert(exSubsDto);
    }

//    회원 번호로 외부구독 검색
    public List<ExSubsDto> exSubsFindAll(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        return subsMapper.exSubsSelect(userNumber);
    }

//    구독 총수 검색
    public int subsCnt(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원번호 누락");

        }
        return subsMapper.subsCount(userNumber);
    }

    public int exSubsCnt(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원번호 누락");

        }
        return subsMapper.exSubsCount(userNumber);
    }

    //외부 구독 삭제
    public void exSubsRemove(ExSubsDto exSubsDto){
        if (exSubsDto == null) {
            throw new IllegalArgumentException("외부 구독 정보 누락");
        }

        subsMapper.exSubsDelete(exSubsDto);
    }

    //내부 구독 취소
    public void subsRemove(Long productNumber,Long userNumber){
        if (productNumber == null) {
            throw new IllegalArgumentException("상품 이름 누락");
        }
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        subsMapper.subsDelete(productNumber,userNumber);
    }

    //내부구독을 위한 상품 검색
    public Long productSubs(ProductDto productDto){
        if (productDto == null) {
            throw new IllegalArgumentException("상품 이름 누락");
        }
        return subsMapper.productSubs(productDto);
    }

    //내부구독 검색
    public Long reSubs(Long productNumber, Long userNumber){
        if (productNumber == null) {
            throw new IllegalArgumentException("상품번호 누락");
        }

        if (userNumber == null) {
            throw new IllegalArgumentException("회원번호 누락");
        }
        return subsMapper.reSubsSelect(productNumber,userNumber);
    }
}
