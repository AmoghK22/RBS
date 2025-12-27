package com.RetailBillingSystem.Retail.Billing.System.repository;

import com.RetailBillingSystem.Retail.Billing.System.Entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity,Long> {


    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategory_CategoryId(String categoryId);
}
