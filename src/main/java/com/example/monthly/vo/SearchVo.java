package com.example.monthly.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
public class SearchVo {
    private String period;
    private String searchSelect;
    private String searchInput;
    private String subscriberInput;
    private Long brandNumber;
    private Long productNumber;
    private Long productName;
    private String productStatus; //우정 추가
    private int page; //우정추가

}
