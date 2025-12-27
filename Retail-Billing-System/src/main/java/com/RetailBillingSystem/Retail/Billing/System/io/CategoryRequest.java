package com.RetailBillingSystem.Retail.Billing.System.io;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
// Data coming from client to server
//Controller receives CategoryRequest
public class CategoryRequest {

    private String name;
    private String description;

}

