package com.tjs.tjsmanager.domain.json;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesRecordJson {
	// 판매 번호
	private Long salesNum;
	
	// 상품 번호
	private Long itemNum;

//	지점 번호
	private Long storeNum;

//	판매 개수
	private Integer salesCnt;
}
