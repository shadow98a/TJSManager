package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// �λ� �� ���̺�
public class EmployeePerformance {
	// �λ� �� ��ȣ
	private Long performanceNum;
	// �λ� �� ��� ���� ��ȣ
	private Employee empNum;
	// �Ҽ� ���� ��ȣ
	private ManagedStore storeNum;
	// �λ� �� �ۼ��� ��ȣ(���� ��ȣ)
	private Employee writerNum;
	// �λ� �� �ۼ��� ���� ��ȣ
	private ManagedStore writerStoreNum;
	// �ۼ���
	private Date createdDate;
	// �� �з�
	private String type;
	// �� ����
	private String discription;
}
