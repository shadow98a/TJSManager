package com.tjs.tjsmanager.scm;

import java.util.Iterator;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.scm.InWarehouseReport;
import com.tjs.tjsmanager.domain.scm.ReqInWarehouse;
import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;
import com.tjs.tjsmanager.repository.scm.ReqInWarehouseRepository;

@SpringBootTest
public class ReqInWarehouseTester {
	@Autowired
	InWarehouseReportRepository inWarehouseReportRepository;
	
	@Autowired
	ReqInWarehouseRepository reqInWarehouseRepository;

	@Test
	public void createRequests() {
		ReqInWarehouse request;
		InWarehouseReport report;
		Iterator<InWarehouseReport> iterator = inWarehouseReportRepository.findByApprovedDateIsNotNull().iterator();
		while (iterator.hasNext()) {
			request = new ReqInWarehouse();
			report=iterator.next();
			request.setStoreNum(report.getStoreNum());
			request.setItemNum(report.getItemNum());
			request.setReqCnt(report.getReqCnt());
			request.setReqDate(report.getReqDate());
			reqInWarehouseRepository.save(request);
		}
	}

}
