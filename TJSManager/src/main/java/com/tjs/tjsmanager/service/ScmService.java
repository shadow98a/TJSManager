package com.tjs.tjsmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.json.InWarehouseReportJson;
import com.tjs.tjsmanager.domain.json.ItemStockJson;
import com.tjs.tjsmanager.domain.json.ReqInWarehouseJson;
import com.tjs.tjsmanager.domain.json.SalesRecordJson;
import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;
import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.domain.scm.ReqInWarehouse;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.domain.scm.SalesRecordPrimaryKey;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
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
	@Autowired
	private EmployeeRepository employeeRepository;
	
	// SalesRecordJson 객체를 SalesRecord Entity 객체로 변환
	public SalesRecord jsonToSalesRecord(SalesRecordJson jsonData) {
		SalesRecord entityData = new SalesRecord();

		entityData.setStoreNum(
				managedStoreRepository.findById(jsonData.getStoreNum()).get() );
		entityData.setSalesCnt(jsonData.getSalesCnt());

		return entityData;
	}
	
	// InWarehouseRecordJson 객체를 InWarehouseRecord Entity 객체로 변환
	public InWarehouseReport jsonToInWarehouseRecord(InWarehouseReportJson jsonData) {
		InWarehouseReport entityData = new InWarehouseReport();
		
		entityData.setItemNum( itemInfoRepository.findById(jsonData.getItemNum()).get() );
		entityData.setReqCnt(jsonData.getReqCnt());
		entityData.setReqDate(jsonData.getReqDate());
		entityData.setStoreNum( managedStoreRepository.findById(jsonData.getStoreNum()).get() );
		entityData.setWriterNum( employeeRepository.findById(jsonData.getWriterNum()).get() );
		entityData.setApprovedDate( jsonData.getApprovedDate() );
		
		return entityData;
	}
	
	// ReqInWarehouseJson 객체를 ReqInWarehouse Entity 객체로 변환
	public ReqInWarehouse jsonToReqInWarehouse(ReqInWarehouseJson jsonData) {
		ReqInWarehouse entityData = new ReqInWarehouse();
		entityData.setItemNum( itemInfoRepository.findById(jsonData.getItemNum()).get() );
		entityData.setStoreNum( managedStoreRepository.findById(jsonData.getStoreNum()).get() );
		entityData.setReqCnt(jsonData.getReqCnt());
		entityData.setReqDate(jsonData.getReqDate());
		
		return entityData;
	}
	
	// ItemStockJson 객체를 ItemStock Entity 객체로 변환
	public ItemStock jsonToItemStock(ItemStockJson jsonData) {
		ItemStock entityData = new ItemStock();

		entityData.setLot(jsonData.getLot());
		entityData.setInCnt(jsonData.getInCnt());
		entityData.setOutCnt(jsonData.getOutCnt());
		entityData.setDropCnt(jsonData.getDropCnt());
		entityData.setSale(jsonData.getSale());
		entityData.setEvent(jsonData.getEvent());
		
		return entityData;
	}
	
	
	
	
	// 물품별 구매자 기록
	public void saveSalesConsumer(SalesConsumer consumer) {
		salesConsumerRepository.save(consumer);
	}
	
	// 모든 물품별 구매자 기록
	public List<SalesConsumer> findAllSalesConsumer() {
		List<SalesConsumer> list = (List<SalesConsumer>)salesConsumerRepository.findAll();
		return list;
	}
	
	// 한 물품별 구매자 기록
	public SalesConsumer findByIdSalesConsumer(Long salesNum) {
		SalesConsumer salesConsumer = salesConsumerRepository.findById(salesNum).get();
		return salesConsumer;
	}
	
	// 판매 이력 기록
	public void saveSalesRecord(SalesRecordJson jsonData) {
		SalesRecord insertData = this.jsonToSalesRecord(jsonData);
		SalesRecordPrimaryKey primaryKey = new SalesRecordPrimaryKey(
				salesConsumerRepository.findById(jsonData.getSalesNum()).get(), itemInfoRepository.findById(jsonData.getItemNum()).get() );
				insertData.setPrimaryKey(primaryKey);
		salesRecordRepository.save(insertData);
	}
	
	// 입고 신청서 작성
	public void saveInWarehouseReport(InWarehouseReportJson jsonData) {
		InWarehouseReport insertData = this.jsonToInWarehouseRecord(jsonData);
		inWarehouseReportRepository.save(insertData);
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
	public void updateInWarehouseReport(Long reportNum, InWarehouseReportJson jsonData) {
		InWarehouseReport updateData = this.jsonToInWarehouseRecord(jsonData);
		updateData.setReportNum(reportNum);
		inWarehouseReportRepository.save(updateData);
	}
	
	// 입고 신청서 삭제
	public void deleteInWarehouseReport(Long reportNum) {
		inWarehouseReportRepository.deleteById(reportNum);
	}
	
	// 최종 입고 신청 이력 생성
	public void saveReqInWarehouse(ReqInWarehouseJson jsonData) {
		ReqInWarehouse insertData = this.jsonToReqInWarehouse(jsonData);
		reqInWarehouseRepository.save(insertData);
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
	public void saveItemStock(ItemStockJson jsonData) {
		ItemStock insertData = this.jsonToItemStock(jsonData);
		
		ItemStockPrimaryKey primaryKey = new ItemStockPrimaryKey(
				itemInfoRepository.findById(jsonData.getItemNum()).get(), managedStoreRepository.findById(jsonData.getStoreNum()).get() );
		
		insertData.setPrimaryKey(primaryKey);
		itemStockRepository.save(insertData);
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
	
	// 재고 정보 수정
	public void updateItemStock(Long itemNum, Long storeNum, ItemStockJson jsonData) {
		ItemStock updateData = this.jsonToItemStock(jsonData);
		ItemStockPrimaryKey primaryKey = new ItemStockPrimaryKey(
				itemInfoRepository.findById(itemNum).get(), managedStoreRepository.findById(storeNum).get() );
		updateData.setPrimaryKey(primaryKey);
		
		itemStockRepository.save(updateData);
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
