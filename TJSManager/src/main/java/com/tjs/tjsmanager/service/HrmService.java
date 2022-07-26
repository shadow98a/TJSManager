package com.tjs.tjsmanager.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;

@Service
public class HrmService {

	@Autowired
	private EmployeeRepository employeeRepository;

	// 직원 로그인
	public String employeeLogIn(EmployeeLoginJson jsonData, HttpSession session) {
		Employee employee = employeeRepository.findById(jsonData.getEmpNum()).get();
		if (employee != null) {

			if (employee.getEmpPassword().equals(jsonData.getEmpPassword())) {
				session.setAttribute("logInAccount", employee);
				return "login success!";
			}
		}
		return "login faild...";
	}

	// 직원 로그아웃
	public void employeeLogOut(HttpSession session) {
		session.invalidate();
	}

	// 직원 로그인 여부 확인
	public boolean employeeIsLogIn(HttpSession session) {
		System.out.println("isLogIn : " + session.getAttribute("logInAccount"));
		return (session.getAttribute("logInAccount") != null);
	}

}
