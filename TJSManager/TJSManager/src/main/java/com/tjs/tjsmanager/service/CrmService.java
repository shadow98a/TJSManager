package com.tjs.tjsmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.domain.json.MembershipCustomerJson;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@Service
public class CrmService {
	
	@Autowired
	private ManagedStoreRepository managedStoreRepository;
	@Autowired
	private MembershipCustomerRepository membershipCustomerRepository;
	
	// json 객체를 entity 객체에 담기
	public MembershipCustomer jsonToEntity(MembershipCustomerJson jsonData) {
		MembershipCustomer entityData = new MembershipCustomer();
		entityData.setCustomerNum( jsonData.getCustomerNum() );
		entityData.setCustomerName( jsonData.getCustomerName() );
		entityData.setCustomerBirthDate( jsonData.getCustomerBirthDate() );
		entityData.setCustomerGender( jsonData.getCustomerGender() );
		entityData.setCustomerPhoneNum( jsonData.getCustomerPhoneNum() );
		entityData.setPoint( jsonData.getPoint() );
		entityData.setJoinedStoreNum(
			managedStoreRepository.findById( jsonData.getJoinedStoreNum() ).get()
		);

		return entityData;
	}

	// 멤버쉽 등록
	public void saveMembershipCustomer(MembershipCustomerJson jsonData) {
		MembershipCustomer insertData = this.jsonToEntity(jsonData);
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
	public void updateMembershipCustomer(MembershipCustomerJson jsonData) {
		MembershipCustomer updateData = this.jsonToEntity(jsonData);
		membershipCustomerRepository.save(updateData);
	}

	// 멤버쉽 해지
	public void deleteMembershipCustomerByCustomerNum(Long customerNum) {
		membershipCustomerRepository.deleteById(customerNum);
	}
	
	
	
	
	// 포인트 적립
	public void updateMembershipCustomerPoint(Long customerNum, int savePoint) {
		MembershipCustomer customer = membershipCustomerRepository.findById(customerNum).get();
		customer.setPoint(savePoint);
		membershipCustomerRepository.save(customer);
	}
}
