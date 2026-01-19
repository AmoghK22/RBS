package com.RetailBillingSystem.Retail.Billing.System.io;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemDTO {

    private String itemName;
    private Double price;
    private Integer quantity;
}
