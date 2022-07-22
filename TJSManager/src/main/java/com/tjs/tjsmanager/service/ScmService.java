package com.tjs.tjsmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;
import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.domain.scm.ReqInWarehouse;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ItemStockRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;
import com.tjs.tjsmanager.repository.scm.ReqInWarehouseRepository;
import com.tjs.tjsmanager.repository.scm.SalesConsumerRepository;
import com.tjs.tjsmanager.repository.scm.SalesRecordRepository;

@Service
public class ScmService {
	
	@Autowired
	private InWarehouseReportRepository inWarehouseReportRepository;
	@Autowired
	private ItemInfoRepository itemInfoRepository;
	@Autowired
	private ItemStockRepository itemStockRepository;
	@Autowired
	private ManagedStoreRepository managedStoreRepository;
	@Autowired
	private ReqInWarehouseRepository reqInWarehouseRepository;
	@Autowired
	private SalesConsumerRepository salesConsumerRepository;
	@Autowired
	private SalesRecordRepository salesRecordRepository;
	
	// 물품별 구매자 기록
	public void saveSalesConsumer(SalesConsumer consumer) {
		salesConsumerRepository.save(consumer);
	}
	
	// 판매 이력 기록
	public void saveSalesRecord(SalesRecord record) {
		salesRecordRepository.save(record);
	}
	
	// 입고 신청서 작성
	public void saveInWarehouseReport(InWarehouseReport inWarehouseReport) {
		inWarehouseReportRepository.save(inWarehouseReport);
	}
	
	// 모든 입고 신청서 조회
	public List<InWarehouseReport> findAllInWarehouseReport() {
		List<InWarehouseReport> list = (List<InWarehouseReport>)inWarehouseReportRepository.findAll();
		return list;
	}
	
	// 한 입고 신청서 조회
	public InWarehouseReport findInWarehouseReportByReportNum(Long reportNum) {
		InWarehouseReport inWarehouseReport = inWarehouseReportRepository.findById(reportNum).get();
		return inWarehouseReport;
	}
	
	// 입고 신청서 수정
	public void updateInWarehouseReport(Long reportNum, InWarehouseReport inWarehouseReport) {
		inWarehouseReportRepository.save(inWarehouseReport);
	}
	
	// 입고 신청서 삭제
	public void deleteInWarehouseReport(Long reportNum) {
		inWarehouseReportRepository.deleteById(reportNum);
	}

	// 모든 최종 입고 신청 이력 조회
	public List<ReqInWarehouse> findAllReqInWarehouse() {
		List<ReqInWarehouse> list = (List<ReqInWarehouse>)reqInWarehouseRepository.findAll();
		return list;
	}
	
	// 한 최종 입고 신청 이력 조회
	public ReqInWarehouse findReqInWarehouseByReqNum(Long reqNum) {
		ReqInWarehouse reqInWarehouse = reqInWarehouseRepository.findById(reqNum).get();
		return reqInWarehouse;
	}
	
	// 재고 등록
	public void saveItemStock(ItemStock itemStock) {
		itemStockRepository.save(itemStock);
	}
	
	// 모든 재고 조회
	public List<ItemStock> findAllItemStock() {
		List<ItemStock> list = (List<ItemStock>)itemStockRepository.findAll();
		return list;
	}
	
	// 한 재고 조회
	public ItemStock findItemStockByItemNum(Long itemNum, Long storeNum) {
		ItemInfo itemInfo = itemInfoRepository.findById(itemNum).get();
		ManagedStore managedStore = managedStoreRepository.findById(storeNum).get();
		ItemStockPrimaryKey itemStockPrimaryKey = new ItemStockPrimaryKey(itemInfo, managedStore);
		
		ItemStock itemStock = itemStockRepository.findById(itemStockPrimaryKey).get();
		return itemStock;
	}

	// 상품 기본 정보 추가
	public void saveItemInfo(ItemInfo itemInfo) {
		itemInfoRepository.save(itemInfo);
	}

	// 모든 상품 기본 정보
	public List<ItemInfo> findAllItemInfo() {
		List<ItemInfo> list = (List<ItemInfo>) itemInfoRepository.findAll();
		return list;
	}
	
	// 한 상품 기본 정보
	public ItemInfo findItemInfoByItemNum(Long itemNum) {
		ItemInfo itemInfo = itemInfoRepository.findById(itemNum).get();
		return itemInfo;
	}
	
	// 상품 기본 정보 수정
	public void updateItemInfo(Long itemNum, ItemInfo itemInfo) {
		itemInfoRepository.save(itemInfo);
	}
	
	// 상품 기본 정보 삭제
	public void deleteItemInfo(Long itemNum) {
		itemInfoRepository.deleteById(itemNum);
	}
}
