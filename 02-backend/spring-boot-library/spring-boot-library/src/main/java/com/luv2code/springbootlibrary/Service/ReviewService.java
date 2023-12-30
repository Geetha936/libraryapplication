package com.luv2code.springbootlibrary.Service;

import com.luv2code.springbootlibrary.dao.ReviewRepository;
import com.luv2code.springbootlibrary.entity.Review;
import com.luv2code.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;
    @Autowired
    public ReviewService( ReviewRepository reviewRepository){
        this.reviewRepository=reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest ) throws Exception{
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,reviewRequest.getBookId());
        if(validateReview!=null){
            throw new Exception("Review already created");
        }
        Review review =new Review();
        review.setRating(reviewRequest.getRating());
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(Object::toString).orElse(null));
        };
        review.setBookId(reviewRequest.getBookId());
        review.setUserEmail(userEmail);
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }
    public Boolean userReviewListed(String UserEmail , Long bookId){
        Review ValidateReview = reviewRepository.findByUserEmailAndBookId(UserEmail, bookId);
        if(ValidateReview !=null){
            return true;
        }
        return false;
    }
}
