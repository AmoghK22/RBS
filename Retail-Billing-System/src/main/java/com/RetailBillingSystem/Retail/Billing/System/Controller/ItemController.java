package com.RetailBillingSystem.Retail.Billing.System.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.RetailBillingSystem.Retail.Billing.System.Service.ItemService;
import com.RetailBillingSystem.Retail.Billing.System.io.ItemRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.ItemResponse;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ItemController {


    private final ItemService itemService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/admin/items")
    public ItemResponse addItem(@RequestBody ItemRequest itemRequest){

        System.out.print("Yoyoyoyoy"+itemRequest);
        return itemService.add(itemRequest);
        
    }

    @GetMapping("/items")
    public List<ItemResponse> readItems(){

      return itemService.fetchItems();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/items/{itemId}")
    public void removeItem(@PathVariable String itemId){

        try{
            itemService.deleteItem(itemId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Item not found:"+ itemId);

        }
            }


}


