package com.example.monthly.service.user;

import com.example.monthly.dto.ProductDto;
import com.example.monthly.mapper.ProductMapper;
import com.example.monthly.mapper.SubsMapper;
import com.example.monthly.service.board.ProductService;
import com.example.monthly.vo.ProductVo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import static org.mockito.junit.jupiter.MockitoExtension.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@Slf4j
class MypageServiceTest {

    @Mock
    private SubsMapper subsMapper;
    @InjectMocks
    private MypageService mypageService;

    private ProductDto productDto = new ProductDto();


    @Test
    void subsFindAll() {
    }

    @Test
    void exSubsRegister() {
    }

    @Test
    void exSubsFindAll() {
    }

    @Test
    void subsCnt() {
    }

    @Test
    void exSubsCnt() {
    }

    @Test
    void exSubsRemove() {
    }

    @Test
    void subsRemove() {
//        productDto.setProductName("파도");
//        doNothing().when(subsMapper).subsDelete(any(String.class));
//        mypageService.subsRemove(productDto.getProductName());
//        verify(subsMapper,times(1)).subsDelete(productDto.getProductName());
    }
}