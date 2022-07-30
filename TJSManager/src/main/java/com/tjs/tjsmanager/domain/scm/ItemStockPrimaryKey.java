package com.tjs.tjsmanager.domain.scm;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class ItemStockPrimaryKey implements Serializable {
	private static final long serialVersionUID = 1L;

//	물품 번호
	@JoinColumn(name = "ITEM_NUM")
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ItemInfo itemNum;

//	지점 번호
	@JoinColumn(name = "STORE_NUM")
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ManagedStore storeNum;
}
