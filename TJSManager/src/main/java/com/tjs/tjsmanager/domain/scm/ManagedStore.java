package com.tjs.tjsmanager.domain.scm;

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
	@Id
	@GeneratedValue
	private Long storeNum;
	
//	지점 로그인을 위한 비밀번호
	private String storePassword;
	
//	지점명
	private String storeName;
	
//	지점 주소
	private String storeAdress;
	
//	지점 연락처
	private String storeTelNum;
}
