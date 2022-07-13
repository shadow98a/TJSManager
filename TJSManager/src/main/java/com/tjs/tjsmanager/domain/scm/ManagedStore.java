package com.tjs.tjsmanager.domain.scm;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//지점 정보
@Data
@Entity
@Table(name="MANAGED_STORE")
public class ManagedStore {
//	지점 번호
	@Column(name="STORE_NUM")
	@Id
	@GeneratedValue
	private Long storeNum;
	
//	지점 로그인을 위한 비밀번호
	@Column(name="STORE_PASSWORD")
	private String storePassword;
	
//	지점명
	@Column(name="STORE_NAME")
	private String storeName;
	
//	지점 주소
	@Column(name="STORE_ADRESS")
	private String storeAdress;
	
//	지점 연락처
	@Column(name="STORE_TEL_NUM")
	private String storeTelNum;
}
