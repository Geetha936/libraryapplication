package com.luv2code.springbootlibrary.Service;

import com.luv2code.springbootlibrary.dao.BookRepository;
import com.luv2code.springbootlibrary.dao.CheckoutRepository;
import com.luv2code.springbootlibrary.dao.ReviewRepository;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.requestmodels.AddBookRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AdminServices {
    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private ReviewRepository reviewRepository;
    @Autowired
    public  AdminServices(BookRepository bookRepository , ReviewRepository reviewRepository,CheckoutRepository checkoutRepository){
        this.reviewRepository=reviewRepository;
        this.checkoutRepository=checkoutRepository;
        this.bookRepository=bookRepository;
    }

    public void increaseBook(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new Exception("Book not available");
        }
        book.get().setCopies(book.get().getCopies()+1);
        book.get().setCopiesavailable(book.get().getCopiesavailable()+1);
        bookRepository.save(book.get());
    }

    public void decreaseBook(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new Exception("Book not available");
        }
        book.get().setCopies(book.get().getCopies()-1);
        book.get().setCopiesavailable(book.get().getCopiesavailable()-1);
        bookRepository.save(book.get());
    }

    public void postBook(AddBookRequest addBookRequest){
        Book book=new Book();
        book.setCopiesavailable(addBookRequest.getCopies());
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setCopies(addBookRequest.getCopies());
        book.setImg(addBookRequest.getImg());
        book.setDescription(addBookRequest.getDescription());
        book.setCategory(addBookRequest.getCategory());
        bookRepository.save(book);
    }

    public  void deleteBook(Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()){
            throw new Exception("Book not available");
        }
        bookRepository.delete(book.get());
        reviewRepository.deleteByBookId(bookId);
        checkoutRepository.deleteByBookId(bookId);


    }


}
