package com.tjs.tjsmanager.domain.scm;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class SalesRecordPrimaryKey implements Serializable {
	private static final long serialVersionUID = 1L;

//	판매 번호
	@JoinColumn(name = "SALES_NUM")
	@ManyToOne
	private SalesConsumer salesNum;

//	판매 물품 번호
	@JoinColumn(name = "ITEM_NUM")
	@ManyToOne
	private ItemInfo itemNum;
}
