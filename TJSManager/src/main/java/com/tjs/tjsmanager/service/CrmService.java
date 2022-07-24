package com.tjs.tjsmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecord;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecordPrimaryKey;
import com.tjs.tjsmanager.domain.json.MembershipCustomerJson;
import com.tjs.tjsmanager.domain.json.MembershipCustomerRecordJson;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRecordRepository;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;
import com.tjs.tjsmanager.repository.scm.SalesConsumerRepository;

@Service
public class CrmService {

	@Autowired
	private ManagedStoreRepository managedStoreRepository;
	@Autowired
	private MembershipCustomerRepository membershipCustomerRepository;
	@Autowired
	private SalesConsumerRepository salesConsumerRepository;
	@Autowired
	private MembershipCustomerRecordRepository membershipCustomerRecordRepository;

	// MembershipCustomerJson 객체를 entity 객체에 담기
	public MembershipCustomer jsonToMembershipCustomer(MembershipCustomerJson jsonData) {
		MembershipCustomer entityData = new MembershipCustomer();
		
		entityData.setCustomerName( jsonData.getCustomerName() );
		entityData.setCustomerBirthDate( jsonData.getCustomerBirthDate() );
		entityData.setCustomerGender( jsonData.getCustomerGender() );
		entityData.setCustomerPhoneNum( jsonData.getCustomerPhoneNum() );
		entityData.setPoint( jsonData.getPoint() );
		entityData.setJoinedStoreNum(
				managedStoreRepository.findById( jsonData.getJoinedStoreNum() ).get() );

		return entityData;
	}
	
	// MembershipCustomerRecordJson 객체를 entity 객체에 담기
	public MembershipCustomerRecord jsonToMembershipCustomerRecord(MembershipCustomerRecordJson jsonData) {
		MembershipCustomer membershipCustomer = membershipCustomerRepository.findById( jsonData.getCustomerNum() ).get();
		SalesConsumer salesConsumer = salesConsumerRepository.findById( jsonData.getSalesNum() ).get();
		MembershipCustomerRecordPrimaryKey primaryKey = new MembershipCustomerRecordPrimaryKey(membershipCustomer, salesConsumer);
		MembershipCustomerRecord membershipCustomerRecord = new MembershipCustomerRecord();
		
		if (primaryKey != null) {
			membershipCustomerRecord.setPrimaryKey(primaryKey);
			membershipCustomerRecord.setSavePoint( jsonData.getSavePoint() );
			membershipCustomerRecord.setUsedPoint( jsonData.getUsedPoint() );
		}
		
		return membershipCustomerRecord;
	}
	
	
	// 멤버쉽 등록
	public void saveMembershipCustomer(MembershipCustomerJson jsonData) {
		MembershipCustomer insertData = this.jsonToMembershipCustomer(jsonData);
		membershipCustomerRepository.save(insertData);
	}

	// 모든 멤버쉽 조회
	public List<MembershipCustomer> findAllMembershipCustomer() {
		List<MembershipCustomer> list = (List<MembershipCustomer>) membershipCustomerRepository.findAll();
		return list;
	}

	// 한 멤버쉽 조회
	public MembershipCustomer findByCustomerNum(Long customerNum) {
		MembershipCustomer customer = membershipCustomerRepository.findById(customerNum).get();
		return customer;
	}

// 멤버쉽 수정
	public void updateMembershipCustomer(Long customerNum, MembershipCustomerJson jsonData) {
		MembershipCustomer updateData = this.jsonToMembershipCustomer(jsonData);
		updateData.setCustomerNum(customerNum);
		membershipCustomerRepository.save(updateData);
	}

	// 멤버쉽 해지
	public void deleteMembershipCustomerByCustomerNum(Long customerNum) {
		membershipCustomerRepository.deleteById(customerNum);
	}


	
	
	// 포인트 적립 및 사용 기록 생성
	public void saveMembershipCustomerRecord(MembershipCustomerRecordJson jsonData) {
		MembershipCustomerRecord insertData = this.jsonToMembershipCustomerRecord(jsonData);
		membershipCustomerRecordRepository.save(insertData);
	}
	
	// 모든 포인트 적립 및 사용 기록 확인
	public List<MembershipCustomerRecord> findAllMembershipCustomerRecord() {
		List<MembershipCustomerRecord> list = (List<MembershipCustomerRecord>)membershipCustomerRecordRepository.findAll();
		return list;
	}
	
	// 한 포인트 적립 및 사용 기록
	public MembershipCustomerRecord findByIdMembershipCustomerRecord(Long customerNum, Long salesNum) {
		MembershipCustomerRecordPrimaryKey primaryKey = new MembershipCustomerRecordPrimaryKey(
				membershipCustomerRepository.findById(customerNum).get(), salesConsumerRepository.findById(salesNum).get());
		
		MembershipCustomerRecord membershipCustomerRecord = membershipCustomerRecordRepository.findById(primaryKey).get();
		return membershipCustomerRecord;
	}
	
}
