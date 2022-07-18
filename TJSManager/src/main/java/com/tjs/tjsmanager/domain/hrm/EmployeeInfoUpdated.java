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

//직원 정보 수정 기록
@Data
@Entity
@Table(name = "EMPLOYEE_INFO_UPDATED")
public class EmployeeInfoUpdated {
//	수정 기록 번호
	@Column(name = "UPDATE_NUM")
	@Id
	@GeneratedValue
	private Long updateNum;

//	수정 대상의 직원 번호
	@JoinColumn(name = "EMP_NUM")
	@ManyToOne
	private Employee emp_num;

//	수정 대상 소속 지점 번호
	@JoinColumn(name = "STORE_NUM")
	@ManyToOne
	private ManagedStore storeNum;

//	수정일
	@Column(name = "UPDATED_DATE")
	private LocalDate updatedDate = LocalDate.now();

//	수정한 직원 번호
	@JoinColumn(name = "UPDATER_NUM")
	@ManyToOne
	private Employee updaterNum;

//	수정한 직원 소속 지점 번호
	@JoinColumn(name = "UPDATER_STORE_NUM")
	@ManyToOne
	private ManagedStore updaterStoreNum;
}
