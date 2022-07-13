package com.tjs.tjsmanager.domain.crm;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//멤버쉽 고객 구매 이력
@Data
@Entity
@Table(name="MEMBERSHIP_CUSTOMER_RECORD")
public class MembershipCustomerRecord {
	@Id
	private MembershipCustomerRecordPrimaryKey primaryKey;
	
//	사용한 포인트
	@Column(name="USED_POINT")
	private Integer usedPoint;
	
//	획득한 포인트
	@Column(name="SAVE_POINT")
	private Integer savePoint;
	
}
