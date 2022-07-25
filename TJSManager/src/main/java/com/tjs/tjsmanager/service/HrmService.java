package com.tjs.tjsmanager.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;

public class HrmService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// 직원 로그인
	public String employeeLogin(EmployeeLoginJson jsonData) {
		if (employeeRepository.findById(jsonData.getEmpNum()) != null) {
			Employee employee = employeeRepository.findById(jsonData.getEmpNum()).get();
			
			if (employee.getEmpPassword() == jsonData.getEmpPassword()) {
				return "login success!";
			}
		}
		return "login faild...";
	}
	
}
