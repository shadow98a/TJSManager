package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;
// 직원 정보 수정 이력 테이블
public class EmployeeInfoUpdated {
	// 수정 기록 번호
	private Long updateNum;
	// 수정 대상의 직원 번호
	private Employee emp_num;
	// 수정 대상 소속 지점 번호
	private ManagedStore storeNum;
	// 수정 일시
	private Date updatedDate;
	// 수정한 직원 번호
	private Employee updaterNum;
	// 수정한 직원 소속 지점 번호
	private ManagedStore updaterStoreNum;
}
