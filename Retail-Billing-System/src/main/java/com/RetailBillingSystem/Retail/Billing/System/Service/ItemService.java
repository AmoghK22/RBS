package com.RetailBillingSystem.Retail.Billing.System.Service;

import com.RetailBillingSystem.Retail.Billing.System.io.ItemRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.ItemResponse;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
