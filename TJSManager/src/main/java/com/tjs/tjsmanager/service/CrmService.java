package com.tjs.tjsmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;

@Service
public class CrmService {
	
	@Autowired
	private MembershipCustomerRepository customerRepository;

	// 멤버쉽 등록
	public void saveMembershipCustomer(MembershipCustomer newMember) {
		customerRepository.save(newMember);
	}
	
	// 모든 멤버쉽 조회
	public List<MembershipCustomer> findAllMembershipCustomer() {
		List<MembershipCustomer> list = (List<MembershipCustomer>) customerRepository.findAll();
		return list;
	}

	// 한 멤버쉽 조회
	public MembershipCustomer findByCustomerNum(Long customerNum) {
		MembershipCustomer customer = customerRepository.findById(customerNum).get();
		return customer;
	}

// 멤버쉽 수정
	public void updateMembershipCustomer(MembershipCustomer customer) {
		customerRepository.save(customer);
	}

	// 멤버쉽 해지
	public void deleteMembershipCustomerByCustomerNum(Long customerNum) {
		customerRepository.deleteById(customerNum);
	}
	
	
	
	
	// 포인트 적립
	public void updateMembershipCustomerPoint(Long customerNum, int savePoint) {
		MembershipCustomer customer = customerRepository.findById(customerNum).get();
		customer.setPoint(savePoint);
		customerRepository.save(customer);
	}
}
