package com.RetailBillingSystem.Retail.Billing.System.Entity;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String categoryId;

    @Column(unique=true)
    private String name;
    private String description;
    private String imgUrl;

    @CreationTimestamp
    @Column(updatable=false)
    private Timestamp   createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;


}
