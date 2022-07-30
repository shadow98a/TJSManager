package com.tjs.tjsmanager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.json.EmployeeJson;
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
	
	
	
	// 직원 정보 생성
	@PostMapping("/employee")
	public void createEmployee(@RequestBody EmployeeJson jsonData) {
		hrmService.saveEmployee(jsonData);
	}
	
	// 모든 직원 정보
	@GetMapping("/employee")
	public List<Employee> getAllEmployee() {
		return hrmService.findAllEmployee();
	}
	
	// 한 직원 정보
	@GetMapping("/employee/{emp_num}")
	public Employee getOneEmployee(@PathVariable("emp_num") Long empNum) {
		return hrmService.findByIdEmployee(empNum);
	}
	
	// 직원 정보 수정
	@PutMapping("/employee/{emp_num}")
	public void updateEmployee(@PathVariable("emp_num") Long empNum, @RequestBody EmployeeJson jsonData) {
		hrmService.updateEmployee(empNum, jsonData);
	}
	
	// 직원 정보 삭제
	@DeleteMapping("/employee/{emp_num}")
	public void deleteEmployee(@PathVariable("emp_num") Long empNum) {
		hrmService.deleteEmployee(empNum);
	}
	
	
	// 모든 직원 정보 수정 기록
//	@GetMapping("/employee/info_updated")
//	public List<EmployeeInfoUpdated> getAllEmployeeInfoUpdated() {
//		List<EmployeeInfoUpdated> list;
//		return list;
//	}
}
