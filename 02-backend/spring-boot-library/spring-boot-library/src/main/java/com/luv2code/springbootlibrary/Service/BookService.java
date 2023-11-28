package com.luv2code.springbootlibrary.Service;

import com.luv2code.springbootlibrary.dao.BookRepository;
import com.luv2code.springbootlibrary.dao.CheckoutRepository;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.entity.Checkout;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {
    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    public BookService(BookRepository bookRepository,CheckoutRepository checkoutRepository){
        this.checkoutRepository=checkoutRepository;
        this.bookRepository=bookRepository;
    }
    public Book checkBook (String userEmail ,Long bookId) throws Exception{
        Optional<Book> book= bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);
        if(!book.isPresent() || validateCheckout !=null || book.get().getCopiesavailable() <=0){
            throw new Exception("Book is not available Or Book is already checked out");

        }
        book.get().setCopiesavailable(book.get().getCopiesavailable()-1);
        bookRepository.save(book.get());
        Checkout checkout = new Checkout(userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId());
        checkoutRepository.save(checkout);
        return book.get();
    }
    public Boolean checkoutBookByUser(String userEmail,Long bookId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(validateCheckout!= null){
            return true;
        }
        else{
            return false;
        }
    }
    public int currentLoansCount(String userEmail){
        return checkoutRepository.findBookByUserEmail(userEmail).size();
    }
}
