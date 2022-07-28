package com.tjs.tjsmanager.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;



@Mapper
public interface SalesConsumerMapper {

	// 전체 성별 판매량
	List<Map<String, Object>> allGroupByConsumerGender();
	
	// 전체 나이대별 판매량
	List<Map<String, Object>> allGroupByConsumerAge();
	
	// 전체 시간대별 판매량
	List<Map<String, Object>> allGroupBySalesTime();
	
}
