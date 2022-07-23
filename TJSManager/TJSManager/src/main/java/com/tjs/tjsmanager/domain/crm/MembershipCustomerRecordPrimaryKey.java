package com.tjs.tjsmanager.domain.crm;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tjs.tjsmanager.domain.scm.SalesConsumer;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class MembershipCustomerRecordPrimaryKey implements Serializable{
	private static final long serialVersionUID = 1L;

//	멤버쉽 고객 번호
	@JoinColumn(name="CUSTOMER_NUM")
	@ManyToOne
	private MembershipCustomer customerNum;
	
//	판매(구매) 번호
	@JoinColumn(name="SALES_NUM")
	@ManyToOne
	private SalesConsumer salesNum;
}

