package com.tjs.tjsmanager.domain.json;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipCustomerJson {
	// 멤버쉽 고객 번호
	private Long customerNum;

	// 고객 이름
	private String customerName;

	// 고객 생년월일
	private LocalDate customerBirthDate;

	// 고객 성별
	private String customerGender;

	// 고객 연락처
	private String customerPhoneNum;

	// 고객 소지 포인트
	private Integer point = 0;

	// 고객이 가입한 지점 번호
	private Long joinedStoreNum;
}
