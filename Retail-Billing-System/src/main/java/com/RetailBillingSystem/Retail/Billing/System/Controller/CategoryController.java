package com.RetailBillingSystem.Retail.Billing.System.Controller;


import com.RetailBillingSystem.Retail.Billing.System.Entity.CategoryEntity;
import com.RetailBillingSystem.Retail.Billing.System.Service.CategoryService;
import com.RetailBillingSystem.Retail.Billing.System.io.CategoryRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.CategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/admin/categories")
    public CategoryResponse addCategory(@RequestBody CategoryRequest request){

     return categoryService.add(request);
    }


    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}
