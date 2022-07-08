package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// 직원 급여 지급 이력 테이블
public class EmployeePayRecord {
	// 기록 번호
	private Long recordNum;
	// 직원 번호
	private Employee empNum;
	// 소속 지점 번호
	private ManagedStore storeNum;
	// 급여 지급일
	private Date payDate;
	// 지급 금액
	private Integer payValue;
}
