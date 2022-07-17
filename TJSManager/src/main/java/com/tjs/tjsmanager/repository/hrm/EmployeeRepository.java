package com.tjs.tjsmanager.repository.hrm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.hrm.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
	List<Employee> findByName(String name);
}
