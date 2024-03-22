package com.luv2code.springbootlibrary.Controller;

import com.luv2code.springbootlibrary.Service.ReviewService;
import com.luv2code.springbootlibrary.requestmodels.ReviewRequest;
import com.luv2code.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class reviewController {
    private ReviewService reviewService;
    public reviewController (ReviewService reviewService){
        this.reviewService=reviewService;
    }
    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token , "\"sub\"");
        if(userEmail==null){
            throw new Exception("UserEmail is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser( @RequestHeader (value = "Authorization") String token,
                                     @RequestParam Long bookId )throws  Exception{
        String UserEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        if(UserEmail == null ){
            throw  new Exception("UserEmail is not present");
        }
        return reviewService.userReviewListed(UserEmail,bookId);
    }
}
