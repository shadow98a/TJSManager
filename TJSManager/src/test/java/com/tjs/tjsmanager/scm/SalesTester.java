package com.tjs.tjsmanager.scm;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecord;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecordPrimaryKey;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.domain.scm.SalesRecordPrimaryKey;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRecordRepository;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;
import com.tjs.tjsmanager.repository.scm.SalesConsumerRepository;
import com.tjs.tjsmanager.repository.scm.SalesRecordRepository;

@SpringBootTest
public class SalesTester {

	@Autowired
	SalesConsumerRepository salesConsumerRepository;

	@Autowired
	ItemInfoRepository itemInfoRepository;

	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	SalesRecordRepository salesRecordRepository;

	@Autowired
	MembershipCustomerRepository membershipCustomerRepository;

	@Autowired
	MembershipCustomerRecordRepository membershipCustomerRecordRepository;

	@Test
	public void createSales() {
//		물품별 구매자 기록
		SalesConsumer consumer = new SalesConsumer();
		consumer.setConsumerGender("m");
		consumer.setConsumerAge(20);
//		consumer.setSalesDate(LocalDateTime.now());하지 않아도 지금으로 초기화 
		consumer.setMemo("메모");
		salesConsumerRepository.save(consumer);

//		판매 이력 기록
		SalesRecord salesRecord;

		salesRecord = new SalesRecord();
		salesRecord.setPrimaryKey(new SalesRecordPrimaryKey(consumer, itemInfoRepository.findByItemName("빵").get(0)));
		salesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		salesRecord.setSalesCnt(1);
		salesRecordRepository.save(salesRecord);

		salesRecord = new SalesRecord();
		salesRecord.setPrimaryKey(new SalesRecordPrimaryKey(consumer, itemInfoRepository.findByItemName("과자").get(0)));
		salesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		salesRecord.setSalesCnt(2);
		salesRecordRepository.save(salesRecord);

//		멤버십 고객 구매 이력 기록
		MembershipCustomer customer = membershipCustomerRepository.findByCustomerName("김주현").get(0);
		customer.setPoint(customer.getPoint() + 500);
		membershipCustomerRepository.save(customer);

		MembershipCustomerRecord CustomerRecord = new MembershipCustomerRecord();
		CustomerRecord.setPrimaryKey(new MembershipCustomerRecordPrimaryKey(customer, consumer));
		CustomerRecord.setSavePoint(500);
		CustomerRecord.setUsedPoint(0);
		membershipCustomerRecordRepository.save(CustomerRecord);
	}

}
