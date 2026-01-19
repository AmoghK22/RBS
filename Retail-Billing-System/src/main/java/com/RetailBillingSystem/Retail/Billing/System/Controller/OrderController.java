package com.RetailBillingSystem.Retail.Billing.System.Controller;

import com.RetailBillingSystem.Retail.Billing.System.Entity.Order;
import com.RetailBillingSystem.Retail.Billing.System.Entity.OrderItem;
import com.RetailBillingSystem.Retail.Billing.System.io.OrderRequestDTO;
import com.RetailBillingSystem.Retail.Billing.System.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//saving to db in controller only
@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /* ================= CREATE ORDER ================= */

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO dto) {

        Order order = new Order();
        order.setCustomerName(dto.getCustomerName());
        order.setPhoneNumber(dto.getPhoneNumber());
        order.setTotalAmount(dto.getTotalAmount());

        List<OrderItem> items = dto.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            item.setItemName(i.getItemName());
            item.setPrice(i.getPrice());
            item.setQuantity(i.getQuantity());
            item.setOrder(order);
            return item;
        }).toList();

        order.setItems(items);
        orderRepository.save(order);

        return ResponseEntity.ok("Order saved successfully");
    }

    /* ================= GET ORDER HISTORY ================= */

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
