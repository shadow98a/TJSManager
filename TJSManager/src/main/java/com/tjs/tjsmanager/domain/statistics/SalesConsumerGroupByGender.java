package com.tjs.tjsmanager.domain.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// 전체 성별 판매량
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesConsumerGroupByGender {

	// 남성
	private Integer man;

	// 여성
	private Integer woman;

	// 성별 알 수 없음
	private Integer unknown;
}
