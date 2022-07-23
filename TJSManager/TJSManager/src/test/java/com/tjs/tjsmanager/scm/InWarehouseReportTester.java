package com.tjs.tjsmanager.scm;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class InWarehouseReportTester {
	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	ItemInfoRepository itemInfoRepository;

	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	InWarehouseReportRepository inWarehouseReportRepository;

	@Test
	public void createReports() {
		InWarehouseReport report;

		report = new InWarehouseReport();
		report.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		report.setItemNum(itemInfoRepository.findByItemName("빵").get(0));
		report.setReqCnt(10);
		report.setReqDate(LocalDate.of(2022, 2, 1));
		report.setWriterNum(employeeRepository.findByName("정승균").get(0));
		report.setApprovedDate(null);
		inWarehouseReportRepository.save(report);

		report = new InWarehouseReport();
		report.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		report.setItemNum(itemInfoRepository.findByItemName("과자").get(0));
		report.setReqCnt(20);
		report.setReqDate(LocalDate.of(2022, 2, 2));
		report.setWriterNum(employeeRepository.findByName("정아윤").get(0));
		report.setApprovedDate(LocalDate.of(2022, 2, 2));
		inWarehouseReportRepository.save(report);
	}
}
