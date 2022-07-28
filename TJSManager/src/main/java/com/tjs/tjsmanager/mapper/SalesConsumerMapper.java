package com.tjs.tjsmanager.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.tjs.tjsmanager.domain.statistics.SalesConsumerGroupByAge;
import com.tjs.tjsmanager.domain.statistics.SalesConsumerGroupByGender;


@Mapper
public interface SalesConsumerMapper {

	// 전체 성별 판매량
	SalesConsumerGroupByGender allGroupByConsumerGender();
	
	// 전체 나이대별 판매량
	SalesConsumerGroupByAge allGroupByConsumerAge();
	
}
