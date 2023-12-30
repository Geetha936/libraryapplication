package com.luv2code.springbootlibrary.Controller;

import com.luv2code.springbootlibrary.Service.AdminServices;
import com.luv2code.springbootlibrary.requestmodels.AddBookRequest;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private AdminServices adminServices;
    public AdminController(AdminServices adminServices){
        this.adminServices=adminServices;
    }

    @PostMapping("/secure/add/book")
    public void addnewBook(@RequestHeader(value = "Authorization") String token , @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token , "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }
        adminServices.postBook(addBookRequest);
    }
    @PutMapping("/secure/increase/book/quantity")
    public void increasequantity(@RequestHeader(value = "Authorization") String token ,
                                 @RequestParam Long bookId ) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }
        adminServices.increaseBook(bookId);
    }
    @PutMapping("/secure/decrease/book/quantity")
    public void decreasequantity(@RequestHeader(value = "Authorization") String token ,
                                 @RequestParam Long bookId ) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }
        adminServices.decreaseBook(bookId);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value="Authorization") String token,
                           @RequestParam Long bookId ) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token,"\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration Page only");
        }
        adminServices.deleteBook(bookId);
    }
}
