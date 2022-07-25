package com.tjs.tjsmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tjs.tjsmanager.domain.json.InWarehouseReportJson;
import com.tjs.tjsmanager.domain.json.ItemStockJson;
import com.tjs.tjsmanager.domain.json.SalesRecordJson;
import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
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
	
	// 모든 물품별 구매자 기록
	@GetMapping("/sales/consumer")
	public List<SalesConsumer> getAllSalesConsumer() {
		List<SalesConsumer> list = scmService.findAllSalesConsumer();
		return list;
	}
	
	// 한 물품별 구매자 기록
	@GetMapping("/sales/consumer/{sales_num}")
	public SalesConsumer getOneSalesConsumer(@PathVariable("sales_num") Long salesNum) {
		SalesConsumer salesConsumer = scmService.findByIdSalesConsumer(salesNum);
		return salesConsumer;
	}
	
	// 판매 이력 기록
	@PostMapping("/sales/record")
	public void createSalesRecord(@RequestBody SalesRecordJson jsonData) {
		scmService.saveSalesRecord(jsonData);
	}
	
	// 모든 판매 이력 기록
	@GetMapping("/sales/record")
	public List<SalesRecord> getAllSalesRecord() {
		List<SalesRecord> list = (List<SalesRecord>)scmService.findAllSalesRecord();
		return list;
	}
	
	// 한 판매 기록
	@GetMapping("/sales/record/{sales_num}/{item_num}")
	public SalesRecord getOneSalesRecord(@PathVariable("sales_num") Long salesNum, @PathVariable("item_num") Long itemNum) {
		SalesRecord salesRecord = scmService.findBySalesPrimaryKeySalesRecord(salesNum, itemNum);
		return salesRecord;
	}

	// 입고 신청서 작성
	@PostMapping("/item/in_warehouse_report")
	public void createInWarehouseReport(@RequestBody InWarehouseReportJson jsonData) {
		scmService.saveInWarehouseReport(jsonData);
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
	public void updateInWarehouseReport(@PathVariable("report_num") Long reportNum, @RequestBody InWarehouseReportJson jsonData) {
		scmService.updateInWarehouseReport(reportNum, jsonData);
	}

	// 입고 신청서 삭제
	@DeleteMapping("/item/in_warehouse_report/{report_num}")
	public void deleteInWarehouseReport(@PathVariable("report_num") Long reportNum) {
		scmService.deleteInWarehouseReport(reportNum);
	}
	
	// 재고 등록
	@PostMapping("/item/stock")
	public void createItemStock(@RequestBody ItemStockJson jsonData) {
		scmService.saveItemStock(jsonData);
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
	
	// 재고 정보 수정
	@PutMapping("/item/stock/{store_num}/{item_num}")
	public void updateItemStock(@PathVariable("store_num") Long storeNum, @PathVariable("item_num") Long itemNum, @RequestBody ItemStockJson jsonData) {
		scmService.updateItemStock(itemNum, storeNum, jsonData);
	}
	
	// 상품 기본 정보 추가
	@PostMapping("item/info")
	public void createItemInfo(@RequestBody ItemInfo itemInfo) {
		scmService.saveItemInfo(itemInfo);
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
