package com.RetailBillingSystem.Retail.Billing.System.repository;

import com.RetailBillingSystem.Retail.Billing.System.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}

