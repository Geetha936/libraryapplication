package com.luv2code.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "messages")
@Data
public class Message {
    public Message(){}

    public Message(String title, String question){
        this.title=title;
        this.question=question;
        this.closed=false;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long id;
    @Column(name = "title")
    public String title;
    @Column(name = "question")
    public String question;
    @Column(name = "user_email")
    public String userEmail;
    @Column(name = "admin_email")
    public String adminEmail;
    @Column(name = "response")
    public String response;
    @Column(name = "closed")
    public Boolean closed;

}
