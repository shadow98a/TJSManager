package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// 직원 근무 일지 테이블
public class EmployeeWorkLog {
	// 근무 일지 번호
	private Long workLogNum;
	// 직원 번호
	private Employee empNum;
	// 소속 지점 번호
	private ManagedStore storeNum;
	// 출근 시각
	private Date startWork;
	// 퇴근 시각
	private Date endWork;
	// 근무 상태
	private String discription;
}
