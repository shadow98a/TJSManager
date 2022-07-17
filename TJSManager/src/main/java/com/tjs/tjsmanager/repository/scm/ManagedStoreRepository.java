package com.tjs.tjsmanager.repository.scm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.ManagedStore;

public interface ManagedStoreRepository extends CrudRepository<ManagedStore, Long> {
	List<ManagedStore> findByStoreName(String storeName);
}
