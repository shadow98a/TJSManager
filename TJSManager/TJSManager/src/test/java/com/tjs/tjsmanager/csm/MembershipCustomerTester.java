package com.tjs.tjsmanager.csm;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class MembershipCustomerTester {

	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	MembershipCustomerRepository membershipCustomerRepository;

	@Test
	public void createCustomers() {
		MembershipCustomer customer;

		customer = new MembershipCustomer();
		customer.setCustomerName("김주현");
		customer.setCustomerBirthDate(LocalDate.of(1998, 12, 14));
		customer.setCustomerGender("m");
		customer.setCustomerPhoneNum("01048223898");
//		customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);

		customer = new MembershipCustomer();
		customer.setCustomerName("박윤호");
		customer.setCustomerBirthDate(LocalDate.of(1998, 9, 1));
		customer.setCustomerGender("m");
		customer.setCustomerPhoneNum("01063491371");
//		customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);

		customer = new MembershipCustomer();
		customer.setCustomerName("정아윤");
		customer.setCustomerBirthDate(LocalDate.of(1988, 2, 9));
		customer.setCustomerGender("f");
		customer.setCustomerPhoneNum("01056125859");
//		customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);
	}
}
