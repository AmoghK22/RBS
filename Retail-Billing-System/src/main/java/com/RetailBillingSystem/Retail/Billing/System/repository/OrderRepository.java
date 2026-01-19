package com.RetailBillingSystem.Retail.Billing.System.repository;

import com.RetailBillingSystem.Retail.Billing.System.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}

