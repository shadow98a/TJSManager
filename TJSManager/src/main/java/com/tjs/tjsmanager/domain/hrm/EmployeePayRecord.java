package com.tjs.tjsmanager.domain.hrm;

import java.util.Date;

// ���� �޿� ���� �̷� ���̺�
public class EmployeePayRecord {
	// ��� ��ȣ
	private Long recordNum;
	// ���� ��ȣ
	private Employee empNum;
	// �Ҽ� ���� ��ȣ
	private ManagedStore storeNum;
	// �޿� ������
	private Date payDate;
	// ���� �ݾ�
	private Integer payValue;
}
