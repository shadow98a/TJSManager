package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// 모든 지점 직원 테이블
public class Employee {
	// 직원 번호
	private Long empNum;
	// 소속 지점 번호
	private ManagedStore storeNum;
	// 로그인을 위한 비밀번호
	private String empPassword;
	// 직원 이름
	private String name;
	// 직책
	private String job;
	// 성별
	private String gender;
	// 생년월일
	private Date birthDate;
	// 휴대전화 번호
	private String phoneNumber;
	// 입사일
	private Date hireDate;
	// 월급
	private Integer salary;
	// 시급
	private Integer wage;
}
