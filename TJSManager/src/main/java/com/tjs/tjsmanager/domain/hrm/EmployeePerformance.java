package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// 인사 평가 테이블
public class EmployeePerformance {
	// 인사 평가 번호
	private Long performanceNum;
	// 인사 평가 대상 직원 번호
	private Employee empNum;
	// 소속 지점 번호
	private ManagedStore storeNum;
	// 인사 평가 작성자 번호(직원 번호)
	private Employee writerNum;
	// 인사 평가 작성자 지점 번호
	private ManagedStore writerStoreNum;
	// 작성일
	private Date createdDate;
	// 평가 분류
	private String type;
	// 평가 내용
	private String discription;
}
