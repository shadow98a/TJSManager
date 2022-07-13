package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tjs.tjsmanager.domain.scm.ManagedStore;

import lombok.Data;

//직원 인사 평가
@Data
@Entity
@Table(name="EMPLOYEE_PERFORMANCE")
public class EmployeePerformance {
//	인사 평가 번호
	@Column(name="PERFORMANCE_NUM")
	@Id
	@GeneratedValue
	private Long performanceNum;
	
//	인사 평가 대상 직원 번호
	@ManyToOne
	@JoinColumn(name="EMP_NUM")
	private Employee empNum;
	
//	소속 지점 번호
	@ManyToOne
	@JoinColumn(name="STORE_NUM")
	private ManagedStore storeNum;
	
//	인사 평가 작성자 번호(직원 번호)
	@ManyToOne
	@JoinColumn(name="WRITER_NUM")
	private Employee writerNum;
	
//	인사 평가 작성자 소속 지점 번호
	@ManyToOne
	@JoinColumn(name="WRITER_STORE_NUM")
	private ManagedStore writerStoreNum;
	
//	작성일
	@Column(name="CREATED_DATE")
	private Date createdDate;
	
//	평가 분류
	@Column(name="TYPE")
	private String type;
	
//	평가 내용
	@Column(name="DISCRIPTION")
	private String discription;
}
