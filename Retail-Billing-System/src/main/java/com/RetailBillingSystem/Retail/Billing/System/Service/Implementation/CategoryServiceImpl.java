package com.RetailBillingSystem.Retail.Billing.System.Service.Implementation;

import com.RetailBillingSystem.Retail.Billing.System.Entity.CategoryEntity;
import com.RetailBillingSystem.Retail.Billing.System.Service.CategoryService;
import com.RetailBillingSystem.Retail.Billing.System.io.CategoryRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.CategoryResponse;
import com.RetailBillingSystem.Retail.Billing.System.repository.CategoryRepository;
import com.RetailBillingSystem.Retail.Billing.System.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {

        //convert request(CategoryRequest) obj to entity(CategoryEntity) obj
        //calling method that will convrt requestObj to EntityObbj
        //and that method off cource returns CategoryEntity
        //SO WE TAKE [CategoryRequest request] in method and we get [CategoryEntity] type obj
        CategoryEntity newCategory = convertToEntity(request);
        categoryRepository.save(newCategory);

        //NOW AS THIS METHOD RETURNS CATEGORYRESPONSE now we need to convert newCategory which of type CategoryEntity to CategoryResponse
        //now converting CategoryEntity Obj to CategoryResponse obj using method convertToResponse

        //calling a method in return tht method returns type of CategoryResponse
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {

      //  return categoryRepository.findAll();
        //  can NOT do this because we want to return list of type CategoryResponse and categooryRepository is of type CategoryEntity

        //converting CategoryEntity List  to CategotyResponse becuase controller returns CategoryResponse List
        return  categoryRepository.findAll()
                .stream()
                .map(CategoryEntity->convertToResponse(CategoryEntity))
                .collect(Collectors.toList());

    }

    @Override
    public void delete(String categoryId) {

        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId).orElseThrow(()->new RuntimeException("Category Not found"+ categoryId));

        categoryRepository.delete(existingCategory);


    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {

        Integer itemCount = itemRepository.countByCategory_CategoryId(newCategory.getCategoryId());
     return    CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
             .items(itemCount)
                .build();
    }

    //this method takes CategoryRequest type obj and returns CategoryEntity type obj
    //thats we want to do because data comes as CategoryRequest type from user but we need to store it to DB which is in CategoryEntity type

    private CategoryEntity convertToEntity(CategoryRequest request) {


        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }
}
