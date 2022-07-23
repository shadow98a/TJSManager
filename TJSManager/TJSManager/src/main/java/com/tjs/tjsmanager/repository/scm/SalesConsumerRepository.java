package com.tjs.tjsmanager.repository.scm;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.SalesConsumer;

public interface SalesConsumerRepository extends CrudRepository<SalesConsumer, Long> {
	long count();
}
