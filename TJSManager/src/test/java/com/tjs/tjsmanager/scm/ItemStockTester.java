package com.tjs.tjsmanager.scm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;
import com.tjs.tjsmanager.repository.scm.ItemStockRepository;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class ItemStockTester {
	@Autowired
	ItemInfoRepository itemInfoRepository;

	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Autowired
	ItemStockRepository itemStockRepository;
	
	@Test
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
}
