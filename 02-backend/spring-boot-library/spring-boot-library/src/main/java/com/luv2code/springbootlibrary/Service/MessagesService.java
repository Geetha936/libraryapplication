package com.luv2code.springbootlibrary.Service;

import com.luv2code.springbootlibrary.dao.MessageRepository;
import com.luv2code.springbootlibrary.entity.Message;
import com.luv2code.springbootlibrary.requestmodels.AdminRequestModel;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MessagesService {
    private MessageRepository messageRepository;
    @Autowired
    public MessagesService(MessageRepository messageRepository){
        this.messageRepository=messageRepository;
    }
    public void postMessage(Message messageRequest, String userEmail){
        Message message = new Message(messageRequest.getTitle(),messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void PutMessage(AdminRequestModel adminRequestModel, String userEmail) throws  Exception{
        Optional<Message> message = messageRepository.findById(adminRequestModel.getId());
        if(!message.isPresent()){
            throw new Exception("Message Not present");
        }
        message.get().setResponse(adminRequestModel.getResponse());
        message.get().setAdminEmail(userEmail);
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
