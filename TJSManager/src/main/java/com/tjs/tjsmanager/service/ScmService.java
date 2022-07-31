package com.tjs.tjsmanager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjs.tjsmanager.domain.json.InWarehouseReportJson;
import com.tjs.tjsmanager.domain.json.ItemStockJson;
import com.tjs.tjsmanager.domain.json.SalesRecordJson;
import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;
import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;
import com.tjs.tjsmanager.domain.scm.SalesRecordPrimaryKey;
import com.tjs.tjsmanager.mapper.SalesConsumerMapper;
import com.tjs.tjsmanager.repository.hrm.EmployeeRepository;
import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ItemStockRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;
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
	private SalesConsumerRepository salesConsumerRepository;
	@Autowired
	private SalesRecordRepository salesRecordRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private SalesConsumerMapper salesConsumerMapper;

	// SalesRecordJson 객체를 SalesRecord Entity 객체로 변환
	public SalesRecord jsonToSalesRecord(SalesRecordJson jsonData) {
		SalesRecord entityData = new SalesRecord();

		entityData.setStoreNum(managedStoreRepository.findById(jsonData.getStoreNum()).get());
		entityData.setSalesCnt(jsonData.getSalesCnt());

		return entityData;
	}

	// InWarehouseRecordJson 객체를 InWarehouseRecord Entity 객체로 변환
	public InWarehouseReport jsonToInWarehouseRecord(InWarehouseReportJson jsonData) {
		InWarehouseReport entityData = new InWarehouseReport();

		entityData.setItemNum(itemInfoRepository.findById(jsonData.getItemNum()).get());
		entityData.setReqCnt(jsonData.getReqCnt());
		entityData.setReqDate(jsonData.getReqDate());
		entityData.setStoreNum(managedStoreRepository.findById(jsonData.getStoreNum()).get());
		entityData.setWriterNum(employeeRepository.findById(jsonData.getWriterNum()).get());
		entityData.setApprovedDate(jsonData.getApprovedDate());

		return entityData;
	}

	// ItemStockJson 객체를 ItemStock Entity 객체로 변환
	public ItemStock jsonToItemStock(ItemStockJson jsonData) {
		ItemStockPrimaryKey primaryKey = new ItemStockPrimaryKey(
				itemInfoRepository.findById(jsonData.getItemNum()).get(),
				managedStoreRepository.findById(jsonData.getStoreNum()).get());
		ItemStock entityData = new ItemStock();

		entityData.setPrimaryKey(primaryKey);
		entityData.setInCnt(jsonData.getInCnt());
		entityData.setOutCnt(jsonData.getOutCnt());
		entityData.setDropCnt(jsonData.getDropCnt());
		entityData.setLot(jsonData.getLot());
		entityData.setSale(jsonData.getSale());
		entityData.setEvent(jsonData.getEvent());

		return entityData;
	}

	// 매점 정보 생성
	public void saveManagedStore(ManagedStore newManagedStore) {
		managedStoreRepository.save(newManagedStore);
	}

	// 모든 매점 정보
	public List<ManagedStore> findAllManagedStore() {
		List<ManagedStore> list = (List<ManagedStore>) managedStoreRepository.findAll();
		return list;
	}

	// 한 매점 정보
	public ManagedStore findByIdManagedStore(Long storeNum) {
		ManagedStore managedStore = managedStoreRepository.findById(storeNum).get();
		return managedStore;
	}

	// 지점 정보 수정
	public void updateManagedStore(Long storeNum, ManagedStore updateData) {
		updateData.setStoreNum(storeNum);
		managedStoreRepository.save(updateData);
	}

	// 지점 정보 삭제
	public void deleteManagedStore(Long storeNum) {
		managedStoreRepository.deleteById(storeNum);
	}

	// 구매자 기록 생성
	public Long saveSalesConsumer(SalesConsumer consumer) {
		return salesConsumerRepository.save(consumer).getSalesNum();
	}

	// 모든 구매자 기록
	public List<SalesConsumer> findAllSalesConsumer() {
		List<SalesConsumer> list = (List<SalesConsumer>) salesConsumerRepository.findAll();
		return list;
	}

	// 한 구매자 기록
	public SalesConsumer findByIdSalesConsumer(Long salesNum) {
		SalesConsumer salesConsumer = salesConsumerRepository.findById(salesNum).get();
		return salesConsumer;
	}

	// 구매자 기록 수정
	public void updateSalesConsumer(Long salesNum, SalesConsumer updateData) {
		updateData.setSalesNum(salesNum);
		salesConsumerRepository.save(updateData);
	}

	// 판매 이력 기록
	public void saveSalesRecord(SalesRecordJson jsonData) {
		SalesRecord insertData = this.jsonToSalesRecord(jsonData);
		SalesRecordPrimaryKey primaryKey = new SalesRecordPrimaryKey(
				salesConsumerRepository.findById(jsonData.getSalesNum()).get(),
				itemInfoRepository.findById(jsonData.getItemNum()).get());
		insertData.setPrimaryKey(primaryKey);
		salesRecordRepository.save(insertData);
	}

	// 모든 판매 이력
	public List<SalesRecord> findAllSalesRecord() {
		List<SalesRecord> list = (List<SalesRecord>) salesRecordRepository.findAll();
		return list;
	}

	// 한 판매 이력
	public SalesRecord findBySalesPrimaryKeySalesRecord(Long salesNum, Long itemNum) {
		SalesRecordPrimaryKey primaryKey = new SalesRecordPrimaryKey(salesConsumerRepository.findById(salesNum).get(),
				itemInfoRepository.findById(itemNum).get());
		SalesRecord salesRecord = salesRecordRepository.findById(primaryKey).get();
		return salesRecord;
	}

	// 판매 이력 수정
	public void updateSalesRecord(Long salesNum, Long itemNum, SalesRecordJson jsonData) {
		SalesRecord updateData = this.jsonToSalesRecord(jsonData);
		SalesRecordPrimaryKey primaryKey = new SalesRecordPrimaryKey(salesConsumerRepository.findById(salesNum).get(),
				itemInfoRepository.findById(itemNum).get());

		updateData.setPrimaryKey(primaryKey);
		salesRecordRepository.save(updateData);
	}

	// 입고 신청서 작성
	public void saveInWarehouseReport(InWarehouseReportJson jsonData) {
		InWarehouseReport insertData = this.jsonToInWarehouseRecord(jsonData);
		inWarehouseReportRepository.save(insertData);
	}

	// 모든 입고 신청서 조회
	public List<InWarehouseReport> findAllInWarehouseReport() {
		List<InWarehouseReport> list = (List<InWarehouseReport>) inWarehouseReportRepository.findAll();
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

	// 재고 등록
	public void saveItemStock(ItemStockJson jsonData) {
		ItemStock insertData = this.jsonToItemStock(jsonData);

		ItemStockPrimaryKey primaryKey = new ItemStockPrimaryKey(
				itemInfoRepository.findById(jsonData.getItemNum()).get(),
				managedStoreRepository.findById(jsonData.getStoreNum()).get());

		insertData.setPrimaryKey(primaryKey);
		itemStockRepository.save(insertData);
	}

	// 모든 재고 조회
	public List<ItemStock> findAllItemStock() {
		List<ItemStock> list = (List<ItemStock>) itemStockRepository.findAll();
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
		ItemStockPrimaryKey primaryKey = new ItemStockPrimaryKey(itemInfoRepository.findById(itemNum).get(),
				managedStoreRepository.findById(storeNum).get());
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
		itemInfo.setItemNum(itemNum);
		itemInfoRepository.save(itemInfo);
	}

	// 상품 기본 정보 삭제
	public void deleteItemInfo(Long itemNum) {
		itemInfoRepository.deleteById(itemNum);
	}

	// 전체 성별 판매량
	public Map<String, Object> allGroupByConsumerGender() {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.allGroupByConsumerGender();
		Map<String, Object> returnJson = new HashMap<String, Object>();

		// map 0으로 초기화 / sql 결과로 해당 성별 데이터가 존재하지 않아도 0명으로 return 가능
		returnJson.put("m", 0);
		returnJson.put("f", 0);
		returnJson.put("-", 0);

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("consumerGender").toString(), row.get("count"));
		}

		return returnJson;
	}

	// 전체 나이대별 판매량
	public Map<Object, Object> allGroupByConsumerAge() {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.allGroupByConsumerAge();
		Map<Object, Object> returnJson = new HashMap<Object, Object>();

		// json = {0: 0, 1: 0, 2: 0, 3: 0, ... 7: 0} 형식으로 초기화
		for (int i = 0; i <= 7; i++) {
			returnJson.put(i, 0);
		}

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("consumerAge"), row.get("count"));
		}

		return returnJson;
	}

	// 전체 24시간대별 판매량
	public Map<Object, Object> allGroupBySalesHour() {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.allGroupBySalesHour();
		Map<Object, Object> returnJson = new HashMap<Object, Object>();

		// returnJson {0: 0, ~ 23: 0} 형식으로 초기화
		for (int i = 0; i <= 23; i++) {
			returnJson.put(i, 0);
		}

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("hour"), row.get("count"));
		}

		return returnJson;
	}

	// 특정 물품에 대한 성별 판매량
	public Map<String, Object> getOneItemGroutByConsumerGender(Long findItemNum) {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.oneItemGroupByConsumerGender(findItemNum);
		Map<String, Object> returnJson = new HashMap<String, Object>();

		returnJson.put("m", 0);
		returnJson.put("f", 0);
		returnJson.put("-", 0);

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("consumerGender").toString(), row.get("count"));
		}

		return returnJson;
	}

	// 특정 물품에 대한 나이대별 판매량
	public Map<Object, Object> getOneItemGroutByConsumerAge(Long findItemNum) {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.oneItemGroupByConsumerAge(findItemNum);
		Map<Object, Object> returnJson = new HashMap<Object, Object>();

		// json = {0: 0, 1: 0, 2: 0, 3: 0, ... 7: 0} 형식으로 초기화
		for (int i = 0; i <= 7; i++) {
			returnJson.put(i, 0);
		}

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("consumerAge"), row.get("count"));
		}

		return returnJson;
	}

	// 특정 물품에 대한 시간대별 판매량
	public Map<Object, Object> getOneItemGroutBySalesHour(Long findItemNum) {
		List<Map<String, Object>> sqlResult = salesConsumerMapper.oneItemGroupBySalesHour(findItemNum);
		Map<Object, Object> returnJson = new HashMap<Object, Object>();

		// returnJson {0: 0, ~ 23: 0} 형식으로 초기화
		for (int i = 0; i <= 23; i++) {
			returnJson.put(i, 0);
		}

		for (Map<String, Object> row : sqlResult) {
			returnJson.put(row.get("hour"), row.get("count"));
		}

		return returnJson;
	}
}
