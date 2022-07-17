package com.tjs.tjsmanager.hrm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.hrm.EmployeePayRecord;
import com.tjs.tjsmanager.repository.hrm.EmployeePayRecordRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;

@SpringBootTest
public class EmployeePayRecordTester {

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	EmployeePayRecordRepository employeePayRecordRepository;

	@Test
	public void createPayRecord() {
		EmployeePayRecord record = new EmployeePayRecord();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		record.setEmpNum(employee);
		record.setStoreNum(employee.getStoreNum());
//		record.setPayDate(LocalDate.now());하지 않아도 오늘로 초기화
		record.setPayValue(1000000);
		employeePayRecordRepository.save(record);
	}

}
