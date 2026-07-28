package com.RetailBillingSystem.Retail.Billing.System.Controller;

import com.RetailBillingSystem.Retail.Billing.System.Entity.Order;
import com.RetailBillingSystem.Retail.Billing.System.Service.Implementation.OrderService;
import com.RetailBillingSystem.Retail.Billing.System.io.OrderRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO dto) {
        orderService.createOrder(dto);
        return ResponseEntity.ok("Order saved successfully");
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
