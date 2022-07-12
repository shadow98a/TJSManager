package com.tjs.tjsmanager.domain.crm;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tjs.tjsmanager.domain.scm.ManagedStore;

import lombok.Data;

//멤버쉽 고객 기본 정보
@Data
@Entity
@Table(name="MEMBERSHIP_CUSTOMER")
public class MembershipCustomer {
//	멤버쉽 고객 번호
	@Column(name="CUSTOMER_NUM")
	@Id
	@GeneratedValue
	private Long customerNum;
	
//	고객 이름
	@Column(name="CUSTOMER_NAME")
	private String customerName;
	
//	고객 생년월일
	@Column(name="CUSTOMER_BIRTH_DATE")
	private Date customerBirthDate;
	
//	고객 성별
	@Column(name="CUSTOMER_GENDER")
	private String customerGender;
	
//	고객 연락처
	@Column(name="CUSTOMER_PHONE_NUM")
	private String customerPhoneNum;
	
//	고객 소지 포인트
	@Column(name="POINT")
	private Integer point;
	
//	고객이 가입한 지점 번호
	@ManyToOne
	@JoinColumn(name="JOINED_STORE_NUM")
	private ManagedStore joinedStoreNum;
	
}
