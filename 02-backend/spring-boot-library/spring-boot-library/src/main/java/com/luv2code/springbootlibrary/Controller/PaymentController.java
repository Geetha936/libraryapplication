package com.luv2code.springbootlibrary.Controller;

import com.luv2code.springbootlibrary.Service.PaymentService;
import com.luv2code.springbootlibrary.requestmodels.PaymentsRequestInfo;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {
    private PaymentService paymentService;
    @Autowired
    public PaymentController (PaymentService paymentService){
        this.paymentService=paymentService;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent (@RequestBody PaymentsRequestInfo paymentsRequestInfo)throws Exception{
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentsRequestInfo);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr , HttpStatus.OK);

    }
    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail==null){
            throw new Exception("userEmail is missing");


        }
        return  paymentService.stripePayment(userEmail);
    }
}
