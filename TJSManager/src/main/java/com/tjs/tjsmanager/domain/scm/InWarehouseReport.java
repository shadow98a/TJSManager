package com.tjs.tjsmanager.domain.scm;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tjs.tjsmanager.domain.hrm.Employee;

import lombok.Data;

//승인대기 입고 신청 이력
@Data
@Entity
@Table(name="IN_WAREHOUSE_REPORT")
public class InWarehouseReport {
//	입고 신청서 번호
	@Column(name="REPORT_NUM")
	@Id
	@GeneratedValue
	private Long reportNum;
	
//	입고 신청한 지점 번호
	private ManagedStore storeNum;
	
//	물품 번호
	private ItemInfo itemNum;
	
//	입고 요청 수량
	@Column(name="REQ_CNT")
	private Integer reqCnt;
	
//	입고 요청일
	@Column(name="REQ_DATE")
	private Date reqDate;
	
//	신청서 작성자 번호
	@Column(name="WRITER_NUM")
	private Employee writerNum;
	
//	점장 승인일
	@Column(name="APPROVED_DATE",nullable=true)
	private Date approvedDate;
}
