package com.tjs.tjsmanager.domain.json;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipCustomerRecordJson {
	// 멤버십 고객 번호
	private Long customerNum;

	// 판매(구매) 번호
	private Long salesNum;

//	사용한 포인트
	private Integer usedPoint = 0;

//	획득한 포인트
	private Integer savePoint = 0;

}
