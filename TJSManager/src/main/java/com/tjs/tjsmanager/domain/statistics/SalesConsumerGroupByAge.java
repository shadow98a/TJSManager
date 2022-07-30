package com.tjs.tjsmanager.domain.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 전체 나이대별 판매량
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesConsumerGroupByAge {

	// 10세 이하
	private Integer underTen;

	// 10대
	private Integer ten;

	// 20대
	private Integer twenty;

	// 30대
	private Integer thirty;

	// 40대
	private Integer forty;

	// 50대
	private Integer fifty;

	// 60대
	private Integer sixty;

	// 70대 이상
	private Integer upSeventy;
}
