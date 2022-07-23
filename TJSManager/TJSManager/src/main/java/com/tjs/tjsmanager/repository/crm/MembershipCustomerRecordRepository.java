package com.tjs.tjsmanager.repository.crm;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecord;
import com.tjs.tjsmanager.domain.crm.MembershipCustomerRecordPrimaryKey;

public interface MembershipCustomerRecordRepository extends CrudRepository<MembershipCustomerRecord,MembershipCustomerRecordPrimaryKey>{

}
