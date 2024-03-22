package com.luv2code.springbootlibrary.requestmodels;

import lombok.Data;

@Data
public class PaymentsRequestInfo {
    private int amount ;
    private  String currency;
    private  String receiptEmail;

}
