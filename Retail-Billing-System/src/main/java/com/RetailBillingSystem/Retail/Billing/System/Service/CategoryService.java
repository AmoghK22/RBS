package com.RetailBillingSystem.Retail.Billing.System.Service;

import com.RetailBillingSystem.Retail.Billing.System.io.CategoryRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

   CategoryResponse add(CategoryRequest request);

   List<CategoryResponse> read();

   void delete(String categoryIds);
}
