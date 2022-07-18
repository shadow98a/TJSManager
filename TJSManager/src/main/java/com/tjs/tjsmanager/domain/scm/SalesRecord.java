package com.tjs.tjsmanager.domain.scm;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

//판매 이력
@Data
@Entity
@Table(name = "SALES_RECORD")
public class SalesRecord {
	@Id
	private SalesRecordPrimaryKey primaryKey;

//	지점 번호
	@ManyToOne
	@JoinColumn(name = "STORE_NUM")
	private ManagedStore storeNum;

//	판매 일시
	@Column(name = "SALES_DATE")
	private LocalDateTime salesDate = LocalDateTime.now();

//	판매 개수
	@Column(name = "SALES_CNT")
	private Integer salesCnt;

//	판매 메모
	@Column(nullable = true)
	private String memo;
}