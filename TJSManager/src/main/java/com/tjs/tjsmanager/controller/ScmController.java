package com.tjs.tjsmanager.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ReqInWarehouse;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.service.ScmService;

@RestController
public class ScmController {
	
	@Autowired
	private ScmService scmService;

	// 물품별 구매자 기록
	@PostMapping("/sales/consumer")
	public void createSalesConsumer(@RequestBody SalesConsumer consumer) {
		scmService.saveSalesConsumer(consumer);
	}
	
	// 판매 이력 기록
	@PostMapping("/sales/record")
	public void createSalesRecord(@RequestBody SalesRecord record) {
		scmService.saveSalesRecord(record);
	}

	// 입고 신청서 작성
	@PostMapping("/item/in_warehouse_report")
	public void createInWarehouseReport(@RequestBody InWarehouseReport inWarehouseReport) {

	}

	// 모든 입고 신청서 조회
	@GetMapping("/item/in_warehouse_report")
	public List<InWarehouseReport> getAllInWarehouseReport() {
		List<InWarehouseReport> list = scmService.findAllInWarehouseReport();
		return list;
	}

	// 한 입고 신청서 조회
	@GetMapping("/item/in_warehouse_report/{report_num}")
	public InWarehouseReport getOneInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		InWarehouseReport inWarehouseReport = scmService.findInWarehouseReportByReportNum(reportNum);
		return inWarehouseReport;
	}

	// 입고 신청서 수정
	@PutMapping("/item/in_warehouse_report/{report_num}")
	public void updateInWarehouseReport(@PathVariable("report_num") Long reportNum, @RequestBody InWarehouseReport inWarehouseReport) {
		scmService.updateInWarehouseReport(reportNum, inWarehouseReport);
	}

	// 입고 신청서 삭제
	@DeleteMapping("/item/in_warehouse_report/{report_num}")
	public void deleteInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		scmService.deleteInWarehouseReport(reportNum);
	}
	
	// 입고 신청 최종 승인
	// 기존의 InWarehouseReport 테이블에 있는 입고 신청서 데이터를 확인해야 하므로, InWarehouseReport 테이블의 Primary key인 report_num을 인자로 받음
	@PostMapping("/item/req_in_warehouse/{report_num}")
	public void approveInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		InWarehouseReport inWarehouseReport = scmService.findInWarehouseReportByReportNum(reportNum);
		inWarehouseReport.setApprovedDate( LocalDate.now() );
		scmService.updateInWarehouseReport(reportNum, inWarehouseReport);
	}
	
	// 모든 최종 입고 신청 이력 조회
	@GetMapping("/item/req_in_warehouse")
	public List<ReqInWarehouse> getAllReqInWarehouse() {
		List<ReqInWarehouse> list = scmService.findAllReqInWarehouse();
		return list;
	}
	
	// 한 최종 입고 신청 이력 조회
	@GetMapping("/item/req_in_warehouse/{req_num}")
	public ReqInWarehouse getOneReqInWarehouse(@PathVariable("req_num") Long reqNum) {
		ReqInWarehouse reqInWarehouse = scmService.findReqInWarehouseByReqNum(reqNum);
		return reqInWarehouse;
	}
	
	// 재고 등록
	@PostMapping("/item/stock")
	public void createItemStock(@RequestBody ItemStock itemStock) {
		
	}
	
	// 모든 재고 조회
	@GetMapping("/item/stock")
	public List<ItemStock> getAllItemStock() {
		List<ItemStock> list = scmService.findAllItemStock();
		return list;
	}
	
	// 한 재고 조회
	@GetMapping("/item/stock/{store_num}/{item_num}")
	public ItemStock getOneItemStock(@PathVariable("store_num") Long storeNum, @PathVariable("item_num") Long itemNum) {
		ItemStock itemStock = scmService.findItemStockByItemNum(itemNum, storeNum);
		return itemStock;
	}
	
	// 모든 상품 기본 정보
	@GetMapping("/item/info")
	public List<ItemInfo> getAllItemInfo() {
		List<ItemInfo> list = (List<ItemInfo>)scmService.findAllItemInfo();
		return list;
	}

	// 한 상품 기본 정보
	@GetMapping("/item/info/{item_num}")
	public ItemInfo getOneItemInfo(@PathVariable("item_num") Long itemNum) {
		ItemInfo itemInfo = scmService.findItemInfoByItemNum(itemNum);
		return itemInfo;
	}
	
	// 상품 기본 정보 수정
	@PutMapping("/item/info/{item_num}")
	public void updateItemInfo(@PathVariable("item_num") Long itemNum, @RequestBody ItemInfo itemInfo) {
		scmService.updateItemInfo(itemNum, itemInfo);
	}
	
	// 상품 기본 정보 삭제
	@DeleteMapping("/item/info/{item_num}")
	public void deleteItemInfo(@PathVariable("item_num") Long itemNum) {
		scmService.deleteItemInfo(itemNum);
	}
}
