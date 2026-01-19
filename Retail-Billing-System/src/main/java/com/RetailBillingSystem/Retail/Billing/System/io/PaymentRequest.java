package com.RetailBillingSystem.Retail.Billing.System.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentRequest {

    private Integer amount;
    private String currency;
    private String method;   // UPI / CASH
}
