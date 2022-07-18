package com.tjs.tjsmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.service.CrmService;

@RestController
public class CrmController {
	
	@Autowired
	private CrmService crmService;

	// 멤버쉽 등록
	@PostMapping("/membership/customer")
	public void createMembershipCustomer(@RequestBody MembershipCustomer newMember) {
		crmService.saveMembershipCustomer(newMember);
	}

	// 모든 멤버쉽 조회
	@GetMapping("/membership/customer")
	public List<MembershipCustomer> getAllMembershipCustomer() {
		List<MembershipCustomer> list = crmService.findAllMembershipCustomer();
		return list;
	}

	// 한 멤버쉽 조회
	@GetMapping("/membership/customer/{customer_num}")
	public MembershipCustomer getOneMembershipCustomer(@PathVariable("customer_num") Long customerNum) {
		MembershipCustomer customer = crmService.findByCustomerNum(customerNum);
		return customer;
	}

	// 멤버쉽 수정
	@PutMapping("/membership/customer/{customer_num}")
	public void updateMembershipCustomer(@PathVariable("customer_num") Long customerNum, @RequestBody MembershipCustomer customer) {
		crmService.updateMembershipCustomer(customer);
	}

	// 멤버쉽 해지
	@DeleteMapping("/membership/customer/{customer_num}")
	public void deleteMembershipCustomer(@PathVariable("customer_num") Long customerNum) {
		crmService.deleteMembershipCustomerByCustomerNum(customerNum);
	}
	
	
	
	
	// 포인트 적립
	@PostMapping("/membership/customer_record/{customer_num}")
	public void saveMembershipPoint(@PathVariable("customer_num") Long customerNum, @RequestBody int savePoint) {
		crmService.updateMembershipCustomerPoint(customerNum, savePoint);
	}

	// 포인트 사용
	@PutMapping("/membership/customer_record/{customer_num}")
	public void useMembershipPoint(@PathVariable("customer_num") Long customerNum, @RequestBody int usedPoint) {
		crmService.updateMembershipCustomerPoint(customerNum, usedPoint);
	}
}
