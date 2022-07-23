package com.tjs.tjsmanager.domain.scm;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//구매자 기록
@Data
@Entity
@Table(name = "SALES_CONSUMER")
public class SalesConsumer {
//	판매 번호
	@Column(name = "SALES_NUM")
	@Id
	@GeneratedValue
	private Long salesNum;

//	구매자 성별
	@Column(name = "CONSUMER_GENDER")
	private String consumerGender;

//	구매자 나이대
	@Column(name = "CONSUMER_AGE")
	private Integer consumerAge;
}
