package com.tjs.tjsmanager.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.service.HrmService;


@RestController
public class HrmController {
	
	@Autowired
	private HrmService hrmService;

	// 로그인
	@PostMapping("/employee/login")
	public String employeeLogin(@RequestBody EmployeeLoginJson jsonData, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		return hrmService.employeeLogIn(jsonData, session);
	}
}
