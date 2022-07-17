package com.tjs.tjsmanager.repository.crm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;

public interface MembershipCustomerRepository extends CrudRepository<MembershipCustomer, Long> {
	List<MembershipCustomer> findByCustomerName(String customerName);
}
