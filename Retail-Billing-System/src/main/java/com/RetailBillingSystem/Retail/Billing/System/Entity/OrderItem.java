package com.RetailBillingSystem.Retail.Billing.System.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private Double price;
    private Integer quantity;


    @ManyToOne
    @JsonIgnore   // 🔥 THIS LINE FIXES EVERYTHING
    @JoinColumn(name = "order_id")
    private Order order;

    // getters & setters
}
