package com.tjs.tjsmanager.domain.json;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemStockJson {
// 물품 번호
	private Long itemNum;

// 지점 번호
	private Long storeNum;

//	입고량
	private Integer inCnt;

//	출고량
	private Integer outCnt;

//	미판매량
	private Integer dropCnt;

//	진열 위치
	private String lot;

//	할인율
	private Integer sale;

//	행사 여부
	private String event;
}
