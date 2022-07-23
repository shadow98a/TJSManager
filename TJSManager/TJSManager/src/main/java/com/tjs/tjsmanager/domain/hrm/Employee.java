package com.tjs.tjsmanager.domain.hrm;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tjs.tjsmanager.domain.scm.ManagedStore;

import lombok.Data;

// 직원 기본 정보
@Data
@Entity
@Table(name = "EMPLOYEE")
public class Employee {
//	 직원 번호
	@Column(name = "EMP_NUM")
	@Id
	@GeneratedValue
	private Long empNum;

//	소속 지점 번호
	@JoinColumn(name = "STORE_NUM")
	@ManyToOne
	private ManagedStore storeNum;

//	로그인을 위한 비밀번호
	@Column(name = "EMP_PASSWORD")
	private String empPassword;

//	직원 이름
	@Column(name = "NAME")
	private String name;

//	직책
	@Column(name = "JOB")
	private String job;

//	성별
	@Column(name = "GENDER")
	private String gender;

//	생년월일
	@Column(name = "BIRTH_DATE")
	private LocalDate birthDate;

//	휴대전화 번호
	@Column(name = "PHONE_NUM", nullable = true)
	private String phoneNum;

//	입사일
	@Column(name = "HIRE_DATE")
	private LocalDate hireDate;

//	월급
	@Column(name = "SALARY")
	private Integer salary;

//	시급
	@Column(name = "WAGE")
	private Integer wage;
}
