package com.RetailBillingSystem.Retail.Billing.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RetailBillingSystem.Retail.Billing.System.Entity.CategoryEntity;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long>{


    Optional<CategoryEntity> findByCategoryId(String categoryId);

}
