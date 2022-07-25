package com.tjs.tjsmanager.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.service.HrmService;


@CrossOrigin(origins="ec2-43-200-8-58.ap-northeast-2.compute.amazonaws.com:8080")
@RestController
public class HrmController {
	
	@Autowired
	private HrmService hrmService;

	// 로그인
	@PostMapping("/employee/login")
	public String employeeLogin(@RequestBody EmployeeLoginJson jsonData, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		System.out.println("my session : " + session);
		return hrmService.employeeLogIn(jsonData, session);
	}
}
