package com.tjs.tjsmanager.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	@PostMapping("/employee/log_in")
	public String employeeLogin(@RequestBody EmployeeLoginJson jsonData, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		return hrmService.employeeLogIn(jsonData, session);
	}
	
	// 직원 로그아웃
	@PostMapping("employee/log_out")
	public void employeeLogOut(HttpSession session) {
		hrmService.employeeLogOut(session);
	}
	
	// 직원 로그인 여부 확인
	@GetMapping("employee/is_log_in")
	public String employeeIsLogIn(HttpSession session) {
		if (hrmService.employeeIsLogIn(session)) {
			return "true";
		} else {
			return "false";
		}
	}
}
