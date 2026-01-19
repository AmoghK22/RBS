package com.RetailBillingSystem.Retail.Billing.System.Controller;

import com.RetailBillingSystem.Retail.Billing.System.Service.PaymentService;
import com.RetailBillingSystem.Retail.Billing.System.io.PaymentRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.PaymentResponse;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create-order")
    public PaymentResponse createOrder(
            @RequestBody PaymentRequest request
    ) throws RazorpayException {

        return paymentService.createOrder(request);
    }
}
