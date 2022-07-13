package com.tjs.tjsmanager.domain.scm;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;


//재고 현황
@Data
@Entity
@Table(name="ITEM_STOCK")
public class ItemStock {
//	물품 번호
	@Column(name="ITEM_NUM")
	@Id
	@GeneratedValue
	private Long itemNum;
	
	@ManyToOne
	@JoinColumn(name="STORE_NUM")
//	지점 번호
	private ManagedStore storeNum;
	
//	입고량
	@Column(name="IN_CNT")
	private Integer inCnt;
	
//	출고량
	@Column(name="OJUT_CNT")
	private Integer outCnt;
	
//	미판매량
	@Column(name="DROP_CNT")
	private Integer dropCnt;
	
//	진열 위치
	@Column(name="LOT",nullable=true)
	private String lot;
	
//	할인율
	@Column(name="SALE")
	private Integer sale;
	
//	행사 여부
	@Column(name="EVENT",nullable=true)
	private Integer event;
}
