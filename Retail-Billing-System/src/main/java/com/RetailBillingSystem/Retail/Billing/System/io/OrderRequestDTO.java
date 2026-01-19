package com.RetailBillingSystem.Retail.Billing.System.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequestDTO {

    private String customerName;
    private String phoneNumber;
    private Double totalAmount;
    private List<OrderItemDTO> items;
}
