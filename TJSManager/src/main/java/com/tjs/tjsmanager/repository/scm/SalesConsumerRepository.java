package com.tjs.tjsmanager.repository.scm;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.SalesConsumer;
import com.tjs.tjsmanager.domain.scm.SalesRecord;

public interface SalesConsumerRepository extends CrudRepository<SalesConsumer,SalesRecord>{

}
