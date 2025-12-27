package com.RetailBillingSystem.Retail.Billing.System.Service.Implementation;

import com.RetailBillingSystem.Retail.Billing.System.Entity.CategoryEntity;
import com.RetailBillingSystem.Retail.Billing.System.Entity.ItemEntity;
import com.RetailBillingSystem.Retail.Billing.System.Service.ItemService;
import com.RetailBillingSystem.Retail.Billing.System.io.ItemRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.ItemResponse;
import com.RetailBillingSystem.Retail.Billing.System.repository.CategoryRepository;
import com.RetailBillingSystem.Retail.Billing.System.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{


    private final ItemRepository itemRepository;

    private final CategoryRepository categoryRepository;


    @Override
    public ItemResponse add(ItemRequest request) {

        ItemEntity newItem = convertToEntity(request);



        //in Item Entity, we have added CategoryEntity also. Therefore to get category(existing one only) we use categoryRepository
        //to find by categoryId. And since in ItemRequest i am taking categoryId so i can use request.getcategoryId
        CategoryEntity existingCategory= categoryRepository.findByCategoryId(request.getCategoryId())
                        .orElseThrow(()-> new RuntimeException("Category Not found" + request.getCategoryId()));

        newItem.setCategory(existingCategory);


       newItem=  itemRepository.save(newItem);


        return  convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newEntity) {

        return ItemResponse.builder()
                .itemId(newEntity.getItemId())
                .name(newEntity.getName())
                .price(newEntity.getPrice())
                .description(newEntity.getDescription())
                .createdAt(newEntity.getCreatedAt())
                .updatedAt(newEntity.getUpdatedAt())
                .categoryName(newEntity.getCategory().getName())
                .categoryId(newEntity.getCategory().getCategoryId())
                .build();

    }

    private ItemEntity convertToEntity(ItemRequest request) {

        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {


        //itemRepository.findAll() will return list of item of typr ItemEntity but in fetchItem method return type is ItemResponse
        //Therfore need to convert EACH ITEM FROM LIST TO ITEMRESPONSE TYPE
        // therefore used stream to get eachh, map to convert to responseEntity,colletors to get again in list
        return itemRepository.findAll()
                .stream()
                .map(itemEntity->convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {

        ItemEntity existingEntity = itemRepository.findByItemId(itemId).orElseThrow(()->new RuntimeException("Item not Found" + itemId));

        itemRepository.delete(existingEntity);
    }
}
