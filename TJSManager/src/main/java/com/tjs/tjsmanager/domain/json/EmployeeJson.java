package com.tjs.tjsmanager.domain.json;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeJson {
//	 직원 번호
	private Long empNum;

//	소속 지점 번호
	private Long storeNum;

//	로그인을 위한 비밀번호
	private String empPassword;

//	직원 이름
	private String name;

//	직책
	private String job;

//	성별
	private String gender;

//	생년월일
	private LocalDate birthDate;

//	휴대전화 번호
	private String phoneNum;

//	입사일
	private LocalDate hireDate;

//	월급
	private Integer salary;

//	시급
	private Integer wage;

}
