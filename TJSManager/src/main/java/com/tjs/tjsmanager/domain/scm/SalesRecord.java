package com.tjs.tjsmanager.domain.scm;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//판매 이력
@Data
@Entity
@Table(name="SALES_RECORD")
public class SalesRecord {
//	판매 번호
	@Id
	@GeneratedValue
	private Integer salesNum;
	
//	지점 번호
	private ManagedStore storeNum;
	
//	판매 일시
	private Date salesDate;
	
//	판매 물품 번호
	private ItemInfo itemNum;
	
//	판매 개수
	private Integer salesCnt;
	
//	판매 메모
	@Column(nullable=true)
	private String memo;
}