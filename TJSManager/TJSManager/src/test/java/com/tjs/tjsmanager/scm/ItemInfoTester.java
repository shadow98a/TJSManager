package com.tjs.tjsmanager.scm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tjs.tjsmanager.domain.scm.ItemInfo;
import com.tjs.tjsmanager.repository.scm.ItemInfoRepository;

@SpringBootTest
public class ItemInfoTester {
	@Autowired
	ItemInfoRepository itemInfoRepository;

	@Test
	public void createItems() {
		ItemInfo item;

		item = new ItemInfo();
		item.setItemName("빵");
		item.setType("식품");
		item.setConsumerPrice(1000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("과자");
		item.setType("식품");
		item.setConsumerPrice(2000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("물");
		item.setType("음료");
		item.setConsumerPrice(3000);
		itemInfoRepository.save(item);

		item = new ItemInfo();
		item.setItemName("음료");
		item.setType("음료");
		item.setConsumerPrice(4000);
		itemInfoRepository.save(item);
	}
}
