package com.luv2code.springbootlibrary.Service;

import ResponseModel.ShelfCurrentLoansResponse;
import com.luv2code.springbootlibrary.dao.BookRepository;
import com.luv2code.springbootlibrary.dao.CheckoutRepository;
import com.luv2code.springbootlibrary.dao.HistoryRepository;
import com.luv2code.springbootlibrary.dao.PaymentRepository;
import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.entity.Checkout;
import com.luv2code.springbootlibrary.entity.History;
import com.luv2code.springbootlibrary.entity.Payment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {
    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    private HistoryRepository historyRepository;

    private PaymentRepository paymentRepository;

    public BookService(BookRepository bookRepository,CheckoutRepository checkoutRepository,HistoryRepository historyRepository,PaymentRepository paymentRepository){
        this.checkoutRepository=checkoutRepository;
        this.bookRepository=bookRepository;
        this.historyRepository=historyRepository;
        this.paymentRepository=paymentRepository;
    }
    public Book checkBook (String userEmail ,Long bookId) throws Exception{
        Optional<Book> book= bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);
        if(!book.isPresent() || validateCheckout !=null || book.get().getCopiesavailable() <=0){
            throw new Exception("Book is not available Or Book is already checked out");

        }
        List<Checkout> currentBooksCheckedOut = checkoutRepository.findBookByUserEmail(userEmail);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        boolean bookNeedsReturned = false;
        for (Checkout checkout : currentBooksCheckedOut){
            Date d1 = sdf.parse(checkout.getReturnDate());
            Date d2 = sdf.parse(LocalDate.now().toString());

            TimeUnit time = TimeUnit.DAYS;
            double differenceInTime = time.convert(d1.getTime() - d2.getTime(),TimeUnit.MILLISECONDS);
            if(differenceInTime < 0){
                bookNeedsReturned =true;
                break;
            }
        }

        Payment userPayment = paymentRepository.findByUserEmail(userEmail);

        if((userPayment!=null && userPayment.getAmount()>0) || (userPayment != null && bookNeedsReturned) ){
            throw new Exception("Outstanding fees");

        }
        if(userPayment == null){
            Payment payment = new Payment();
            payment.setAmount(00.00);
            payment.setUserEmail(userEmail);
            paymentRepository.save(payment);

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

    public List<ShelfCurrentLoansResponse> CurrentLoans(String userEmail) throws Exception{
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();
        List<Checkout> checkoutListh = checkoutRepository.findBookByUserEmail(userEmail);
        List<Long> bookIdList = new ArrayList<>();
        for (Checkout i : checkoutListh){
            bookIdList.add(i.getBookId());
        }

        List<Book> books = bookRepository.findBookByBookIds(bookIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for(Book book : books){
            Optional<Checkout> checkout = checkoutListh.stream().filter(x-> x.getBookId() == book.getId()).findFirst();

            if(checkout.isPresent()){
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time= TimeUnit.DAYS;

                long difference_in_Days = time.convert(d1.getTime()-d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) difference_in_Days));
            }
        }

        return shelfCurrentLoansResponses;

    }
    public void returnBook(String userEmail, Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);
        if(validateCheckout==null || !book.isPresent()){
            throw new Exception("Book not available or not checked out by user");
        }
        book.get().setCopiesavailable(book.get().getCopiesavailable() +1);
        bookRepository.save(book.get());
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse((validateCheckout.getReturnDate()));
        Date d2 = sdf.parse(LocalDate.now().toString());

        TimeUnit time= TimeUnit.DAYS;

        double difference = time.convert(d1.getTime()-d2.getTime(),TimeUnit.MILLISECONDS);

        if(difference < 0 ){
            Payment payment = paymentRepository.findByUserEmail(userEmail);
            payment.setAmount(payment.getAmount() + (difference * -1));
            paymentRepository.save(payment);

        }

        checkoutRepository.deleteById(validateCheckout.getId());
        History history =new History(userEmail,validateCheckout.getCheckoutDate(),LocalDate.now().toString(),book.get().getTitle(),book.get().getAuthor(),book.get().getDescription(),book.get().getImg());
        historyRepository.save(history);


    }

    public void renewBook(String userEmail,Long bookId) throws Exception{
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);
        if(checkout==null){
            throw new Exception("Book not available or not checked out by user");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdf.parse(checkout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if(d1.compareTo(d2) > 0 || d1.compareTo(d2)==0){
            checkout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(checkout);
        }
    }
}

