package com.RetailBillingSystem.Retail.Billing.System.Service;

import com.RetailBillingSystem.Retail.Billing.System.io.PaymentRequest;
import com.RetailBillingSystem.Retail.Billing.System.io.PaymentResponse;
import com.razorpay.RazorpayException;

public interface PaymentService {

    PaymentResponse createOrder(PaymentRequest request) throws RazorpayException;
}
