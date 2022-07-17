package com.tjs.tjsmanager.hrm;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class EmployeeTester {
	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	EmployeeRepository employeeRepository;

	@Test
	public void createEmployees() {
		Employee employee;

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword1");
		employee.setName("김주현");
		employee.setJob("일반");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 12, 14));
		employee.setPhoneNum("01048223898");
		employee.setHireDate(LocalDate.of(2022, 1, 1));
		employee.setSalary(0);
		employee.setWage(10000);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword2");
		employee.setName("박윤호");
		employee.setJob("일반");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 9, 1));
		employee.setPhoneNum("01063491371");
		employee.setHireDate(LocalDate.of(2022, 1, 2));
		employee.setSalary(0);
		employee.setWage(20000);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword3");
		employee.setName("정승균");
		employee.setJob("매니저");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 8, 31));
		employee.setPhoneNum("01046889719");
		employee.setHireDate(LocalDate.of(2022, 1, 3));
		employee.setSalary(3000000);
		employee.setWage(0);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword4");
		employee.setName("정아윤");
		employee.setJob("점장");
		employee.setGender("f");
		employee.setBirthDate(LocalDate.of(1988, 2, 9));
		employee.setPhoneNum("01056125859");
		employee.setHireDate(LocalDate.of(2022, 1, 4));
		employee.setSalary(4000000);
		employee.setWage(0);
		employeeRepository.save(employee);
	}

}
