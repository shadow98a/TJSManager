package com.tjs.tjsmanager.domain.scm;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
class PrimaryKey implements Serializable{
	private static final long serialVersionUID = 1L;
	
//	물품 번호
	private Long itemNum;
	
//	지점 번호
	private ManagedStore storeNum;
}

//재고 현황
@Data
@Entity
@Table(name="ITEM_STOCK")
public class ItemStock {
	@Id
	private PrimaryKey key;
	
//	입고량
	private Long inCnt;
	
//	출고량
	private Long outCnt;
	
//	미판매량
	private Long dropCnt;
	
//	진열 위치
	@Column(nullable=true)
	private String lot;
	
//	할인율
	private Long sale;
	
//	행사 여부
	@Column(nullable=true)
	private String event;
}
