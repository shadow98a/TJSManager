package com.tjs.tjsmanager.domain.scm;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//재고 현황
@Data
@Entity
@Table(name = "ITEM_STOCK")
public class ItemStock {
	@Id
	private ItemStockPrimaryKey primaryKey;

//	입고량
	@Column(name = "IN_CNT")
	private Integer inCnt;

//	출고량
	@Column(name = "OUT_CNT")
	private Integer outCnt;

//	미판매량
	@Column(name = "DROP_CNT")
	private Integer dropCnt;

//	진열 위치
	@Column(name = "LOT", nullable = true)
	private String lot;

//	할인율
	@Column(name = "SALE")
	private Integer sale;

//	행사 여부
	@Column(name = "EVENT", nullable = true)
	private String event;
}
