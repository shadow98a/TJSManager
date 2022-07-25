package com.tjs.tjsmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecord;
import com.tjs.tjsmanager.domain.json.MembershipCustomerJson;
import com.tjs.tjsmanager.domain.json.MembershipCustomerRecordJson;
import com.tjs.tjsmanager.service.CrmService;

@CrossOrigin(origins="ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080")
@RestController
public class CrmController {
	
	@Autowired
	private CrmService crmService;

	// 멤버쉽 등록
	@PostMapping("/membership/customer")
	public void createMembershipCustomer(@RequestBody MembershipCustomerJson newMember) {
		System.out.println("======== request : " + newMember);
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
	public void updateMembershipCustomer(@PathVariable("customer_num") Long customerNum, @RequestBody MembershipCustomerJson customer) {
		crmService.updateMembershipCustomer(customerNum, customer);
	}

	// 멤버쉽 해지
	@DeleteMapping("/membership/customer/{customer_num}")
	public void deleteMembershipCustomer(@PathVariable("customer_num") Long customerNum) {
		crmService.deleteMembershipCustomerByCustomerNum(customerNum);
	}
	
	
	
	
	// 포인트 적립 및 사용 기록 생성
	@PostMapping("/membership/customer_record")
	public void createMembershipCustomerRecord(@RequestBody MembershipCustomerRecordJson jsonData) {
		crmService.saveMembershipCustomerRecord(jsonData);
	}
	
	// 모든 포인트 적립 및 사용 기록
	@GetMapping("/membership/customer_record")
	public List<MembershipCustomerRecord> getAllMembershipCustomerRecord() {
		List<MembershipCustomerRecord> list = (List<MembershipCustomerRecord>)crmService.findAllMembershipCustomerRecord();
		return list;
	}
	
	// 한 포인트 적립 및 사용 기록
	@GetMapping("/membership/customer_record/{customer_num}/{sales_num}")
	public MembershipCustomerRecord getOneMembershipCustomerRecord(@PathVariable("customer_num") Long customerNum, @PathVariable("sales_num") Long salesNum) {
		MembershipCustomerRecord membershipCustomerRecord = crmService.findByIdMembershipCustomerRecord(customerNum, salesNum);
		return membershipCustomerRecord;
	}
}
