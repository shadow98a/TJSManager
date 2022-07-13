package com.tjs.tjsmanager.domain.scm;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

//입고 신청 이력
@Data
@Entity
@Table(name="REQ_IN_WAREHOUSE")
public class ReqInWarehouse {
//	입고 신청 번호
	@Id
	@GeneratedValue
	private Long reqNum;
	
//	입고 신청한 지점 번호
	private ManagedStore storeNum;
	
//	물품 번호
	private ItemInfo itemNum;
	
//	입고 요청 수량
	private Integer reqCnt;
	
//	입고 요청일
	private Date reqDate;
}
