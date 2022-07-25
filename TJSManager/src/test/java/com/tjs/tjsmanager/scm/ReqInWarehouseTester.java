package com.tjs.tjsmanager.scm;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.repository.scm.InWarehouseReportRepository;

@SpringBootTest
public class ReqInWarehouseTester {
	@Autowired
	InWarehouseReportRepository inWarehouseReportRepository;


}
