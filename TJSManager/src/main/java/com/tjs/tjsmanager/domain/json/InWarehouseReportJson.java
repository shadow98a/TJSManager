package com.tjs.tjsmanager.domain.json;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class InWarehouseReportJson {
//	입고 신청서 번호
	private Long reportNum;

//	입고 신청한 지점 번호
	private Long storeNum;

//	물품 번호
	private Long itemNum;

//	입고 요청 수량
	private Integer reqCnt;

//	입고 요청일
	private LocalDate reqDate;

//	신청서 작성자 번호
	private Long writerNum;

//	점장 승인일
	private LocalDate approvedDate;

}
