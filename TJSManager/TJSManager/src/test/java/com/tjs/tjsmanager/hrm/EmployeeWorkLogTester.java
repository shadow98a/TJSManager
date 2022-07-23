package com.tjs.tjsmanager.hrm;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.hrm.EmployeeWorkLog;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeWorkLogRepository;

@SpringBootTest
public class EmployeeWorkLogTester {
	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	EmployeeWorkLogRepository employeeWorkLogRepository;

	@Test
	public void createWorkLog() {
		EmployeeWorkLog log = new EmployeeWorkLog();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		log.setEmpNum(employee);
		log.setStoreNum(employee.getStoreNum());
		log.setStartWork(LocalDateTime.of(2022, 7, 1, 9, 20));
		log.setEndWork(LocalDateTime.of(2022, 7, 1, 16, 40));
		log.setDiscription("근무");
		employeeWorkLogRepository.save(log);
	}

}
