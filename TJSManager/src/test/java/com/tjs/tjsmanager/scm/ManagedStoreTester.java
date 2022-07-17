package com.tjs.tjsmanager.scm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.scm.ManagedStore;
import com.tjs.tjsmanager.repository.scm.ManagedStoreRepository;

@SpringBootTest
public class ManagedStoreTester {
	@Autowired
	ManagedStoreRepository managedStoreRepository;

	@Test
	public void createStores() {
		ManagedStore store;

		store = new ManagedStore();
		store.setStorePassword("storePassword1");
		store.setStoreName("씨앗 편의점 '앗편' 중랑구점");
		store.setStoreAdress("서울특별시 중랑구");
		store.setStoreTelNum("0200000001");
		managedStoreRepository.save(store);

		store = new ManagedStore();
		store.setStorePassword("storePassword2");
		store.setStoreName("씨앗 편의점 '앗편' 동대문구점");
		store.setStoreAdress("서울특별시 동대문구");
		store.setStoreTelNum("0200000002");
		managedStoreRepository.save(store);
	}
}