package com.tjs.tjsmanager.domain.json;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeLoginJson {
// 직원 번호
	private Long empNum;

	// 로그인 시 사용하는 직원 비밀번호
	private String empPassword;
}
