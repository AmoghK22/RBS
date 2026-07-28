package com.RetailBillingSystem.Retail.Billing.System.Service.Implementation;

import com.RetailBillingSystem.Retail.Billing.System.Entity.Order;
import com.RetailBillingSystem.Retail.Billing.System.Entity.OrderItem;
import com.RetailBillingSystem.Retail.Billing.System.io.OrderRequestDTO;
import com.RetailBillingSystem.Retail.Billing.System.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void createOrder(OrderRequestDTO dto) {
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
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}