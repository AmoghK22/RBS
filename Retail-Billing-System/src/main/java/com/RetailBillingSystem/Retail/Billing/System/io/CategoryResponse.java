package com.RetailBillingSystem.Retail.Billing.System.io;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
//Data going from server to client

public class CategoryResponse {

    private String categoryId;
    private String name;
    private String description;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Integer items;
}
