package com.tjs.tjsmanager.domain.scm;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//구매자 기록
@Data
@Entity
@Table(name="SALES_CONSUMER")
public class SalesConsumer {
//	판매 번호
	@Id
	
	private SalesRecord salesNum;
	
//	구매자 성별
	private String consumerGender;
	
//	구매자 나이대
	private Long consumerAge;
}
