package com.tjs.tjsmanager.hrm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.hrm.EmployeePerformance;
import com.tjs.tjsmanager.repository.hrm.EmployeePerformanceRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;

@SpringBootTest
public class EmployeePerformanceTester {

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	EmployeePerformanceRepository employeePerformanceRepository;

	@Test
	public void createPerformance() {
		EmployeePerformance performance = new EmployeePerformance();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		performance.setEmpNum(employee);
		performance.setStoreNum(employee.getStoreNum());
		Employee writer = employeeRepository.findByName("정승균").get(0);
		performance.setWriterNum(writer);
		performance.setWriterStoreNum(writer.getStoreNum());
//		performance.setCreatedDate(LocalDate.now());하지 않아도 오늘로 초기화
		performance.setType("월간");
		performance.setDiscription("코딩 테스트 불합격");
		employeePerformanceRepository.save(performance);
	}
}
