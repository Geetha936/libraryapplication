package com.luv2code.springbootlibrary.Controller;

import com.luv2code.springbootlibrary.Service.MessagesService;
import com.luv2code.springbootlibrary.entity.Message;
import com.luv2code.springbootlibrary.requestmodels.AdminRequestModel;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private MessagesService messagesService;

    @Autowired
    public MessageController(MessagesService messagesService){
        this.messagesService=messagesService;
    }
    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token , @RequestBody Message messageRequest){
        String userEmail= ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        messagesService.postMessage(messageRequest,userEmail);
    }

    @PutMapping("/secure/admin/response")
    public void putmessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminRequestModel adminRequestModel) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token , "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token , "\"userType\"");
        if(admin==null){
            throw new Exception("Administration page only");
        }
        messagesService.PutMessage(adminRequestModel,userEmail);
    }


}
