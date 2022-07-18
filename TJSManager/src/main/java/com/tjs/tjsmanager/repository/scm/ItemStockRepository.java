package com.tjs.tjsmanager.repository.scm;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.ItemStock;
import com.tjs.tjsmanager.domain.scm.ItemStockPrimaryKey;

public interface ItemStockRepository extends CrudRepository<ItemStock,ItemStockPrimaryKey>{

}
