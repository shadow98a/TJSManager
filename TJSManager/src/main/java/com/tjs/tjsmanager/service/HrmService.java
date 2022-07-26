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
			
			if (employee.getEmpPassword() == jsonData.getEmpPassword()) {
				session.setAttribute("loginAccount", employee);
				return "login success!";
			}
		}
		
		System.out.println("db id : " + employee.getEmpNum() + ", db PassWord : " + employee.getEmpPassword() + " / json ID : " + jsonData.getEmpNum() + ", json PassWord : " + jsonData.getEmpPassword());
		return "login faild...";
	}
	
	// 직원 로그아웃
	public void employeeLogOut(HttpSession session) {
		if (session.getAttribute("loginAccount") != null) {
			session.removeAttribute("loginAccount");
		}
	}
	
	// 직원 로그인 여부 확인
	public boolean isLogIn(HttpSession session) {
		Employee employee = (Employee)session.getAttribute("loginAccount");
		return (employee != null);
	}
	
}
