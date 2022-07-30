package com.tjs.tjsmanager.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.json.EmployeeJson;
import com.tjs.tjsmanager.domain.json.EmployeeLoginJson;
import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@Service
public class HrmService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private ManagedStoreRepository managedStoreRepository;
	
	// EmployeeJson 객체를 Employee Entity 객체로 변환
	public Employee jsonToEmploy(EmployeeJson jsonData) {
		Employee entityData = new Employee();
		Optional<ManagedStore> findedManagedStore = managedStoreRepository.findById(jsonData.getStoreNum());
		
		if ( findedManagedStore.isEmpty() ) {
			entityData.setStoreNum(null);
		} else {
			entityData.setStoreNum( findedManagedStore.get() );
			entityData.setName(jsonData.getName());
			entityData.setEmpPassword(jsonData.getEmpPassword());
			entityData.setGender(jsonData.getGender());
			entityData.setBirthDate(jsonData.getBirthDate());
			entityData.setPhoneNum(jsonData.getPhoneNum());
			entityData.setJob(jsonData.getJob());
			entityData.setHireDate(jsonData.getHireDate());
			entityData.setSalary(jsonData.getSalary());
			entityData.setWage(jsonData.getWage());
		}
		
		return entityData;
	}
	
	// 직원 로그인
	public String employeeLogIn(EmployeeLoginJson jsonData, HttpSession session) {
		Optional<Employee> optionalEmp = employeeRepository.findById(jsonData.getEmpNum());
		if ( ! optionalEmp.isEmpty() ) {

			Employee employee = optionalEmp.get();
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
		return (session.getAttribute("logInAccount") != null);
	}

	// 직원 정보 생성
	public void saveEmployee(EmployeeJson jsonData) {
		Employee insertData = this.jsonToEmploy(jsonData);
		employeeRepository.save(insertData);
	}
	
	// 모든 직원 정보
	public List<Employee> findAllEmployee() {
		List<Employee> list = (List<Employee>)employeeRepository.findAll();
		return list;
	}
	
	// 한 직원 정보
	public Employee findByIdEmployee(Long empNum) {
		Employee employee = null;
		Optional<Employee> findedEmployee = employeeRepository.findById(empNum);
		
		if ( ! findedEmployee.isEmpty() ) {
			employee = findedEmployee.get();
		}
		
		return employee;
	}
	
	// 직원 정보 수정
	public void updateEmployee(Long empNum, EmployeeJson jsonData) {
		Employee updateData = this.jsonToEmploy(jsonData);
		updateData.setEmpNum(empNum);
		employeeRepository.save(updateData);
	}
	
	// 직원 정보 삭제
	public void deleteEmployee(Long empNum) {
		employeeRepository.deleteById(empNum);
	}
}
