package com.tjs.tjsmanager.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.crm.MembershipCustomer;
import com.tjs.tjsmanager.domain.hrm.Employee;
import com.tjs.tjsmanager.domain.hrm.EmployeeInfoUpdated;
import com.tjs.tjsmanager.domain.hrm.EmployeePayRecord;
import com.tjs.tjsmanager.domain.hrm.EmployeePerformance;
import com.tjs.tjsmanager.domain.hrm.EmployeeWorkLog;
import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;
import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.domain.scm.SalesRecordPrimaryKey;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRecordRepository;
import com.tjs.tjsmanager.repository.crm.MembershipCustomerRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeInfoUpdatedRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeePayRecordRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeePerformanceRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.hrm.EmployeeWorkLogRepository;
import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ItemStockRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;
import com.tjs.tjsmanager.repository.scm.SalesConsumerRepository;
import com.tjs.tjsmanager.repository.scm.SalesRecordRepository;

@RestController
public class TestController {
	@Autowired
	ItemInfoRepository itemInfoRepository;

	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	InWarehouseReportRepository inWarehouseReportRepository;

	@Autowired
	ItemStockRepository itemStockRepository;

	@Autowired
	MembershipCustomerRepository membershipCustomerRepository;

	@Autowired
	SalesConsumerRepository salesConsumerRepository;

	@Autowired
	SalesRecordRepository salesRecordRepository;

	@Autowired
	MembershipCustomerRecordRepository membershipCustomerRecordRepository;

	@Autowired
	EmployeePayRecordRepository employeePayRecordRepository;

	@Autowired
	EmployeePerformanceRepository employeePerformanceRepository;

	@Autowired
	EmployeeWorkLogRepository employeeWorkLogRepository;

	@Autowired
	EmployeeInfoUpdatedRepository employeeInfoUpdatedRepository;

	@GetMapping("/test/createSamples")
	public void createSamples() {
//      Create essential samples
		createItems();
		createStores();
		createEmployees();

//      Create SCM samples
		createReports();
		createStocks();

//      Create CRM samples
		createCustomers();

//      Create HRM samples
		createPayRecord();
		createPerformance();
		createWorkLog();
		updateEmployee();

		createSalesConsumerAndSalesRecordForStatistics();
	}

//   Create essential samples
//   @Test
	public void createItems() {
		ItemInfo item;

		item = new ItemInfo();
		item.setItemName("빵");
		item.setType("식품");
		item.setConsumerPrice(1000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("과자");
		item.setType("식품");
		item.setConsumerPrice(2000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("물");
		item.setType("음료");
		item.setConsumerPrice(3000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("음료");
		item.setType("음료");
		item.setConsumerPrice(4000);
		itemInfoRepository.save(item);
	}

//   @Test
	public void createStores() {
		ManagedStore store;

		store = new ManagedStore();
		store.setStorePassword("storePassword1");
		store.setStoreName("씨앗 편의점 '앗편' 중랑구점");
		store.setStoreAddress("서울특별시 중랑구");
		store.setStoreTelNum("0200000001");
		managedStoreRepository.save(store);

		store = new ManagedStore();
		store.setStorePassword("storePassword2");
		store.setStoreName("씨앗 편의점 '앗편' 동대문구점");
		store.setStoreAddress("서울특별시 동대문구");
		store.setStoreTelNum("0200000002");
		managedStoreRepository.save(store);
	}

//   @Test
	public void createEmployees() {
		Employee employee;

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword1");
		employee.setName("김주현");
		employee.setJob("일반");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 12, 14));
		employee.setPhoneNum("01048223898");
		employee.setHireDate(LocalDate.of(2022, 1, 1));
		employee.setSalary(0);
		employee.setWage(10000);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword2");
		employee.setName("박윤호");
		employee.setJob("일반");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 9, 1));
		employee.setPhoneNum("01063491371");
		employee.setHireDate(LocalDate.of(2022, 1, 2));
		employee.setSalary(0);
		employee.setWage(20000);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword3");
		employee.setName("정승균");
		employee.setJob("매니저");
		employee.setGender("m");
		employee.setBirthDate(LocalDate.of(1998, 8, 31));
		employee.setPhoneNum("01046889719");
		employee.setHireDate(LocalDate.of(2022, 1, 3));
		employee.setSalary(3000000);
		employee.setWage(0);
		employeeRepository.save(employee);

		employee = new Employee();
		employee.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		employee.setEmpPassword("empPassword4");
		employee.setName("정아윤");
		employee.setJob("점장");
		employee.setGender("f");
		employee.setBirthDate(LocalDate.of(1988, 2, 9));
		employee.setPhoneNum("01056125859");
		employee.setHireDate(LocalDate.of(2022, 1, 4));
		employee.setSalary(4000000);
		employee.setWage(0);
		employeeRepository.save(employee);
	}

//   Create SCM samples
//   @Test
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

//   @Test
	public void createStocks() {
		ItemStock stock;

		stock = new ItemStock();
		stock.setPrimaryKey(new ItemStockPrimaryKey(itemInfoRepository.findByItemName("빵").get(0),
				managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0)));
		stock.setInCnt(10);
		stock.setOutCnt(1);
		stock.setDropCnt(1);
		stock.setLot("1");
		stock.setSale(0);
		stock.setEvent("1+1");
		itemStockRepository.save(stock);

		stock = new ItemStock();
		stock.setPrimaryKey(new ItemStockPrimaryKey(itemInfoRepository.findByItemName("과자").get(0),
				managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0)));
		stock.setInCnt(20);
		stock.setOutCnt(2);
		stock.setDropCnt(2);
		stock.setLot("2");
		stock.setSale(0);
		stock.setEvent("2+1");
		itemStockRepository.save(stock);

		stock = new ItemStock();
		stock.setPrimaryKey(new ItemStockPrimaryKey(itemInfoRepository.findByItemName("물").get(0),
				managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0)));
		stock.setInCnt(30);
		stock.setOutCnt(3);
		stock.setDropCnt(3);
		stock.setLot("3");
		stock.setSale(30);
		stock.setEvent(null);
		itemStockRepository.save(stock);

		stock = new ItemStock();
		stock.setPrimaryKey(new ItemStockPrimaryKey(itemInfoRepository.findByItemName("음료").get(0),
				managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0)));
		stock.setInCnt(40);
		stock.setOutCnt(4);
		stock.setDropCnt(4);
		stock.setLot(null);
		stock.setSale(0);
		stock.setEvent(null);
		itemStockRepository.save(stock);
	}

//   Create CRM samples
//   @Test
	public void createCustomers() {
		MembershipCustomer customer;

		customer = new MembershipCustomer();
		customer.setCustomerName("김주현");
		customer.setCustomerBirthDate(LocalDate.of(1998, 12, 14));
		customer.setCustomerGender("m");
		customer.setCustomerPhoneNum("01048223898");
//      customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);

		customer = new MembershipCustomer();
		customer.setCustomerName("박윤호");
		customer.setCustomerBirthDate(LocalDate.of(1998, 9, 1));
		customer.setCustomerGender("m");
		customer.setCustomerPhoneNum("01063491371");
//      customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);

		customer = new MembershipCustomer();
		customer.setCustomerName("정아윤");
		customer.setCustomerBirthDate(LocalDate.of(1988, 2, 9));
		customer.setCustomerGender("f");
		customer.setCustomerPhoneNum("01056125859");
//      customer.setPoint(0);하지 않아도 0으로 초기화
		customer.setJoinedStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		membershipCustomerRepository.save(customer);
	}

//   Create HRM samples
//   @Test
	public void createPayRecord() {
		EmployeePayRecord record = new EmployeePayRecord();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		record.setEmpNum(employee);
		record.setStoreNum(employee.getStoreNum());
//      record.setPayDate(LocalDate.now());하지 않아도 오늘로 초기화
		record.setPayValue(1000000);
		employeePayRecordRepository.save(record);
	}

//   @Test
	public void createPerformance() {
		EmployeePerformance performance = new EmployeePerformance();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		performance.setEmpNum(employee);
		performance.setStoreNum(employee.getStoreNum());
		Employee writer = employeeRepository.findByName("정승균").get(0);
		performance.setWriterNum(writer);
		performance.setWriterStoreNum(writer.getStoreNum());
//      performance.setCreatedDate(LocalDate.now());하지 않아도 오늘로 초기화
		performance.setType("월간");
		performance.setDiscription("코딩 테스트 불합격");
		employeePerformanceRepository.save(performance);
	}

//   @Test
	public void createWorkLog() {
		EmployeeWorkLog log = new EmployeeWorkLog();
		Employee employee = employeeRepository.findByName("김주현").get(0);
		log.setEmpNum(employee);
		log.setStoreNum(employee.getStoreNum());
		log.setStartWork(LocalDateTime.of(2022, 7, 1, 9, 20));
		log.setEndWork(LocalDateTime.of(2022, 7, 1, 16, 40));
		log.setDiscription("근무");
		employeeWorkLogRepository.save(log);
	}

//   @Test
	public void updateEmployee() {
		// 직원 정보 수정
		Employee employee = employeeRepository.findByName("김주현").get(0);
		employee.setName("(김주현의 바뀐 이름)");
		employeeRepository.save(employee);

		// 직원 정보 수정 기록
		EmployeeInfoUpdated update = new EmployeeInfoUpdated();
		Employee updater = employeeRepository.findByName("정승균").get(0);
		update.setEmp_num(employee);
		update.setStoreNum(employee.getStoreNum());
//      update.setUpdatedDate(LocalDate.now());하지 않아도 오늘로 초기화
		update.setUpdaterNum(updater);
		update.setUpdaterStoreNum(updater.getStoreNum());
		employeeInfoUpdatedRepository.save(update);
	}

	public void createSalesConsumerAndSalesRecordForStatistics() {
		SalesConsumer sampleSalesConsumer;
		SalesRecord sampleSalesRecord;
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();

		sampleSalesConsumer.setConsumerAge(0);
		sampleSalesConsumer.setConsumerGender("m");
		sampleSalesConsumer.setMemo("과자 다량 구매 3봉투");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 1, 10, 20) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("과자").get(0)));
		sampleSalesRecord.setSalesCnt(13);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		
		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("음료").get(0)));
		sampleSalesRecord.setSalesCnt(2);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("빵").get(0)));
		sampleSalesRecord.setSalesCnt(3);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();
		
		sampleSalesConsumer.setConsumerAge(0);
		sampleSalesConsumer.setConsumerGender("f");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 2, 14, 5) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("과자").get(0)));
		sampleSalesRecord.setSalesCnt(1);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();
		
		sampleSalesConsumer.setConsumerAge(1);
		sampleSalesConsumer.setConsumerGender("m");
		sampleSalesConsumer.setMemo("또래 여러 명과 방문");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 2, 16, 25) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("빵").get(0)));
		sampleSalesRecord.setSalesCnt(3);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("과자").get(0)));
		sampleSalesRecord.setSalesCnt(3);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("음료").get(0)));
		sampleSalesRecord.setSalesCnt(3);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		
		sampleSalesConsumer.setConsumerAge(1);
		sampleSalesConsumer.setConsumerGender("f");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 3, 17, 20) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("과자").get(0)));
		sampleSalesRecord.setSalesCnt(2);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("빵").get(0)));
		sampleSalesRecord.setSalesCnt(2);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));
		
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("음료").get(0)));
		sampleSalesRecord.setSalesCnt(1);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();
		sampleSalesConsumer.setConsumerAge(2);
		sampleSalesConsumer.setConsumerGender("f");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 3, 12, 40) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("물").get(0)));
		sampleSalesRecord.setSalesCnt(3);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("음료").get(0)));
		sampleSalesRecord.setSalesCnt(1);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();
		
		sampleSalesConsumer.setConsumerAge(5);
		sampleSalesConsumer.setConsumerGender("m");
		sampleSalesConsumer.setMemo("물 대량 구매");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 3, 15, 0) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("물").get(0)));
		sampleSalesRecord.setSalesCnt(25);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		
		
		sampleSalesConsumer = new SalesConsumer();
		sampleSalesRecord = new SalesRecord();
		
		sampleSalesConsumer.setConsumerAge(6);
		sampleSalesConsumer.setConsumerGender("f");
		sampleSalesConsumer.setMemo("등산복");
		sampleSalesConsumer.setSalesDate( LocalDateTime.of(2022, 3, 3, 20, 0) );
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("물").get(0)));
		sampleSalesRecord.setSalesCnt(5);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesConsumerRepository.save(sampleSalesConsumer);
		salesRecordRepository.save(sampleSalesRecord);
		
		
		sampleSalesRecord = new SalesRecord();
		sampleSalesRecord.setPrimaryKey(
				new SalesRecordPrimaryKey(sampleSalesConsumer, itemInfoRepository.findByItemName("음료").get(0)));
		sampleSalesRecord.setSalesCnt(1);
		sampleSalesRecord.setStoreNum(managedStoreRepository.findByStoreName("씨앗 편의점 '앗편' 중랑구점").get(0));

		salesRecordRepository.save(sampleSalesRecord);
	}

}