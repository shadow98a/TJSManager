package com.tjs.tjsmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ReqInWarehouse;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;

@RestController
public class ScmController {

	// 물품별 구매자 기록
	@PostMapping("/sales/consumer")
	public void createSalesConsumer(@RequestBody SalesConsumer consumer) {
		
	}
	
	// 판매 이력 기록
	@PostMapping("/sales/record")
	public Long createSalesRecord(@RequestBody SalesRecord record) {
		return record.getSalesNum();
	}

	// 입고 신청서 작성
	@PostMapping("/item/in_warehouse_report")
	public void createInWarehouseReport(@RequestBody InWarehouseReport inWarehouseReport) {

	}

	// 모든 입고 신청서 조회
	@GetMapping("/item/in_warehouse_report")
	public List<InWarehouseReport> getAllInWarehouseReport() {
		List<InWarehouseReport> list;
		return list;
	}

	// 한 입고 신청서 조회
	@GetMapping("/item/in_warehouse_report/{report_num}")
	public InWarehouseReport getOneInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		InWarehouseReport inWarehouseReport;
		return inWarehouseReport;
	}

	// 입고 신청서 수정
	@PutMapping("/item/in_warehouse_report/{report_num}")
	public void updateInWarehouseReport(@PathVariable("report_num") Long reportNum) {

	}

	// 입고 신청서 삭제
	@DeleteMapping("/item/in_warehouse_report/{report_num}")
	public void deleteInWarehouseReport(@PathVariable("report_num") Long reportNum) {

	}
	
	// 입고 신청 최종 승인
	// 기존의 InWarehouseReport 테이블에 있는 입고 신청서 데이터를 확인해야 하므로, InWarehouseReport 테이블의 Primary key인 report_num을 인자로 받음
	@PostMapping("/item/req_in_warehouse/{report_num}")
	public void approveInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		
	}
	
	// 모든 최종 입고 신청 이력 조회
	@GetMapping("/item/req_in_warehouse")
	public List<ReqInWarehouse> getAllReqInWarehouse() {
		List<ReqInWarehouse> list;
		return list;
	}
	
	// 한 최종 입고 신청 이력 조회
	@GetMapping("/item/req_in_warehouse/{req_num}")
	public ReqInWarehouse getOneReqInWarehouse(@PathVariable("req_num") Long reqNum) {
		ReqInWarehouse reqInWarehouse;
		return reqInWarehouse;
	}
	
	
}
