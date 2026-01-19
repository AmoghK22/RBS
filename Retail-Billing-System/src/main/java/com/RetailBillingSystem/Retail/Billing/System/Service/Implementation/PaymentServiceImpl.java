package com.RetailBillingSystem.Retail.Billing.System.Service.Implementation;

import com.RetailBillingSystem.Retail.Billing.System.Entity.PaymentEntity;
import com.RetailBillingSystem.Retail.Billing.System.Service.PaymentService;
import com.RetailBillingSystem.Retail.Billing.System.io.PaymentRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.PaymentResponse;
import com.RetailBillingSystem.Retail.Billing.System.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;

    @Override
    public PaymentResponse createOrder(PaymentRequest request)
            throws RazorpayException {

        // 1️⃣ Create Razorpay Order
        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount());
        options.put("currency", request.getCurrency());
        options.put("receipt", "rec_" + System.currentTimeMillis());

        Order order = razorpayClient.orders.create(options);

        // 2️⃣ Convert Request → Entity
        PaymentEntity paymentEntity = convertToEntity(request, order.get("id"));

        // 3️⃣ Save to DB
        paymentRepository.save(paymentEntity);

        // 4️⃣ Convert Entity → Response
        return convertToResponse(paymentEntity);
    }

    private PaymentEntity convertToEntity(PaymentRequest request, String razorpayOrderId) {

        return PaymentEntity.builder()
                .paymentId(UUID.randomUUID().toString())
                .razorpayOrderId(razorpayOrderId)
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .method(request.getMethod())
                .status("CREATED")
                .build();
    }

    private PaymentResponse convertToResponse(PaymentEntity entity) {

        return PaymentResponse.builder()
                .paymentId(entity.getPaymentId())
                .razorpayOrderId(entity.getRazorpayOrderId())
                .amount(entity.getAmount())
                .currency(entity.getCurrency())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
