package com.tjs.tjsmanager.domain.scm;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//상품 기본 정보
@Data
@Entity
@Table(name="ITEM_INFO")
public class ItemInfo {
//	물품 번호
	@Column(name="ITEM_NUM")
	@Id
	@GeneratedValue
	private Long itemNum;
	
//	물품명
	@Column(name="ITEM_NAME")
	private String itemName;
	
//	물품 분류
	@Column(name="TYPE")
	private String type;
	
//	소비자판매가
	@Column(name="CONSUMER_PRICE")
	private Integer consumerPrice;
	
//	제조일자
	@Column(name="PRODUCT_DATE")
	private Date productDate;
	
//	유통기한
	@Column(name="EXPIRATION_DATE",nullable=true)
	private Date expirationDate;
}
