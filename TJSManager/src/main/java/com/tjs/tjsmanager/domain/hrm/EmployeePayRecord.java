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

//직원 급여 지급 기록
@Data
@Entity
@Table(name="EMPLOYEE_PAY_RECORD")
public class EmployeePayRecord {
//	기록 번호
	@Column(name="RECORD_NUM")
	@Id
	@GeneratedValue
	private Long recordNum;
	
//	직원 번호
	@ManyToOne
	@JoinColumn(name="EMP_NUM")
	private Employee empNum;
	
//	소속 지점 번호
	@ManyToOne
	@JoinColumn(name="STORE_NUM")
	private ManagedStore storeNum;
	
//	급여 지급일
	@Column(name="PAY_DATE")
	private Date payDate;
	
//	지급 금액
	@Column(name="PAY_VALUE")
	private Integer payValue;
}
