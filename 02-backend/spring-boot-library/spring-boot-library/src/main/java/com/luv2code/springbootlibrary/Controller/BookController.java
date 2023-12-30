package com.luv2code.springbootlibrary.Controller;

import ResponseModel.ShelfCurrentLoansResponse;
import com.luv2code.springbootlibrary.Service.BookService;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentloans(@RequestHeader(value = "Authorization") String token)throws Exception{
        String userEmail =ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return bookService.CurrentLoans(userEmail);
    }
    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value ="Authorization") String token){
        String useremail=ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentLoansCount(useremail);
    }
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookid,@RequestHeader(value ="Authorization") String token){
        String userEmail=ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return bookService.checkoutBookByUser(userEmail,bookid);
    }
    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token,
                           @RequestParam Long bookId) throws Exception{
        String userEmail= ExtractJWT.payloadJWTExtraction(token , "\"sub\"");
        bookService.returnBook(userEmail,bookId);
    }
    @PutMapping("/secure/renew")
    public void renewBook(@RequestHeader(value = "Authorization") String token , @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        bookService.renewBook(userEmail,bookId);
    }
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookid,@RequestHeader(value ="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return  bookService.checkBook(userEmail,bookid);
    }
}
