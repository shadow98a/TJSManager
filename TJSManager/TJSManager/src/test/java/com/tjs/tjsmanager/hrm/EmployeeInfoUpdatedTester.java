package com.tjs.tjsmanager.hrm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.hrm.EmployeeInfoUpdated;
import com.tjs.tjsmanager.repository.hrm.EmployeeInfoUpdatedRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class EmployeeInfoUpdatedTester {
	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	EmployeeInfoUpdatedRepository employeeInfoUpdatedRepository;

	@Test
	public void updateEmployee() {
		// 직원 정보 수정
		Employee employee = employeeRepository.findByName("김주현").get(0);
		employee.setName("(김주현의 바뀐 이름)");
		employeeRepository.save(employee);

		// 직원 정보 수정 기록
		EmployeeInfoUpdated update = new EmployeeInfoUpdated();
		Employee updater = employeeRepository.findByName("정승균").get(0);
		update.setEmp_num(employee);
		update.setStoreNum(employee.getStoreNum());
//		update.setUpdatedDate(LocalDate.now());하지 않아도 오늘로 초기화
		update.setUpdaterNum(updater);
		update.setUpdaterStoreNum(updater.getStoreNum());
		employeeInfoUpdatedRepository.save(update);
	}

}
