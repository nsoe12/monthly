package com.example.monthly.service.board;

import com.example.monthly.dto.ProductDto;
import com.example.monthly.mapper.ProductMapper;
import com.example.monthly.vo.ProductVo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@Slf4j
class ProductServiceTest {

    @Mock
    private ProductMapper productMapper;
    @InjectMocks
    private ProductService productService;

    private ProductDto productDto;
    private ProductVo productVo;

    @BeforeEach
    void setUp(){
        productDto = new ProductDto();
        productDto.setProductName("testName");
        productDto.setProductOption("option");
        productDto.setProductPrice("10000");
        productDto.setProductAmount(1000L);
        productDto.setProductContents("contentssss");
    }

    @Test
    void productView() {
    }

    @Test
    @DisplayName("상품등록")
    void registProduct() {
//        doNothing().when(productMapper).insertProduct(any(ProductDto.class));
//        productService.registProduct(productDto);
//        verify(productMapper, times(1)).insertProduct(productDto);
    }

    @Test
    @DisplayName("상품삭제")
    void deleteProduct() {
        doNothing().when(productMapper).deleteProduct(any(Long.class));
//       productService.removeProduct(1L);
       verify(productMapper, times(1)).deleteProduct(1L);
    }

    @Test
    @DisplayName("상품수정")
    void modifyProduct() {
        doNothing().when(productMapper).updateProduct(any(ProductDto.class));
        productService.modifyProduct(productDto);
        verify(productMapper, times(1)).updateProduct(productDto);
    }

    @Test
    void testModifyProduct() {
    }
}