package com.tjs.tjsmanager.repository.scm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;

public interface InWarehouseReportRepository extends CrudRepository<InWarehouseReport, Long> {
	List<InWarehouseReport> findByApprovedDateIsNotNull();
}
