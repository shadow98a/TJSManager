package com.tjs.tjsmanager.repository.hrm;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.hrm.Employee;

public interface EmployeeRepository extends CrudRepository<Employee,Long>{

}
