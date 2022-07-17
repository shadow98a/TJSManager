package com.tjs.tjsmanager.repository.scm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.ItemInfo;

public interface ItemInfoRepository extends CrudRepository<ItemInfo, Long> {
	List<ItemInfo> findByItemName(String itemName);
}
