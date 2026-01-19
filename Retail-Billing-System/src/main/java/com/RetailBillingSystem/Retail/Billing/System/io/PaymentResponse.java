package com.RetailBillingSystem.Retail.Billing.System.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class PaymentResponse {

    private String paymentId;
    private String razorpayOrderId;
    private Integer amount;
    private String currency;
    private String status;
    private Timestamp createdAt;
}
