package com.tjs.tjsmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.service.HrmService;

public class HrmController {
	
	@Autowired
	private HrmService hrmService;

	// 로그인
	@PostMapping("/employee/login")
	public String employeeLogin(@RequestBody EmployeeLoginJson jsonData) {
		return hrmService.employeeLogin(jsonData);
	}
}
