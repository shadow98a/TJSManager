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

//직원 근무 기록
@Data
@Entity
@Table(name="EMPLOYEE_WORK_LOG")
public class EmployeeWorkLog {
//	근무 일지 번호
	@Column(name="WORK_LOG_NUM")
	@Id
	@GeneratedValue
	private Long workLogNum;
 
//	직원 번호
	@ManyToOne
	@JoinColumn(name="EMP_NUM")
	private Employee empNum;
	
//	소속 지점 번호
	@ManyToOne
	@JoinColumn(name="STORE_NUM")
	private ManagedStore storeNum;
	
//	출근 시각
	@Column(name="START_WORK")
	private Date startWork;
	
//	퇴근 시각
	@Column(name="END_WORK")
	private Date endWork;
	
//	근무 상태
	@Column(name="DISCRIPTION")
	private String discription;
}
