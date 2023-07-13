package com.example.monthly.mapper;

import com.example.monthly.dto.ExSubsDto;
import com.example.monthly.dto.ProductDto;
import com.example.monthly.dto.SubsDto;
import com.example.monthly.vo.SubsVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubsMapper {

    //내부 구독 정보 출력
    List<SubsVo> subsSelect(Long userNumber);

//    외부 구독 추가
    void exSubsInsert(ExSubsDto exSubsDto);
//    외부 구독 조회
    List<ExSubsDto> exSubsSelect(Long userNumber);

//    구독 카운트
    int subsCount(Long userNumber);

    int exSubsCount(Long userNumber);

    //외부 구독 삭제

    void exSubsDelete(ExSubsDto exSubsDto);

    //내부 구독 취소
    void subsDelete(Long productNumber,Long userNumber);

    Long productSubs(ProductDto productDto);

    Long reSubsSelect(Long productNumber,Long userNumber);
}
