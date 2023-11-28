package com.luv2code.springbootlibrary.Controller;

import com.luv2code.springbootlibrary.Service.BookService;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;
    @Autowired
    public BookController(BookService bookService){
        this.bookService =bookService;
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
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookid,@RequestHeader(value ="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return  bookService.checkBook(userEmail,bookid);
    }
}
