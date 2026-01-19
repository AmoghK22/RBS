package com.RetailBillingSystem.Retail.Billing.System.repository;

import com.RetailBillingSystem.Retail.Billing.System.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    Optional<PaymentEntity> findByPaymentId(String paymentId);
}
