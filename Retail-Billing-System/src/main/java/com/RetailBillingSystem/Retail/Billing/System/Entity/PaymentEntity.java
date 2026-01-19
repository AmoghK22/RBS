package com.RetailBillingSystem.Retail.Billing.System.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String paymentId;          // internal payment id

    private String razorpayOrderId;
    private String razorpayPaymentId;

    private Integer amount;            // paise
    private String currency;

    private String method;             // UPI / CASH
    private String status;             // CREATED / PAID / FAILED

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
