package com.tjs.tjsmanager.domain.scm;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tjs.tjsmanager.domain.hrm.Employee;

import lombok.Data;

//승인대기 입고 신청 이력
@Data
@Entity
@Table(name = "IN_WAREHOUSE_REPORT")
public class InWarehouseReport {
//	입고 신청서 번호
	@Column(name = "REPORT_NUM")
	@Id
	@GeneratedValue
	private Long reportNum;

//	입고 신청한 지점 번호
	@JoinColumn(name = "STORE_NUM")
	@ManyToOne
	private ManagedStore storeNum;

//	물품 번호
	@JoinColumn(name = "ITEM_NUM")
	@ManyToOne
	private ItemInfo itemNum;

//	입고 요청 수량
	@Column(name = "REQ_CNT")
	private Integer reqCnt;

//	입고 요청일
	@Column(name = "REQ_DATE")
	private LocalDate reqDate;

//	신청서 작성자 번호
	@JoinColumn(name = "WRITER_NUM")
	@ManyToOne
	private Employee writerNum;

//	점장 승인일
	@Column(name = "APPROVED_DATE", nullable = true)
	private LocalDate approvedDate;
}
