package com.example.instamail_backend.service.MailsService;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.instamail_backend.model.Attachment;
import com.example.instamail_backend.repository.AttachmentRepository;

@Service
public class AttachmentService {
     private final String attachmentPath = "E:\\Programming 2\\New folder\\InstaMail\\instamail-backend\\src\\main\\java\\com\\example\\instamail_backend\\uploads\\";
   
    File attachmentFile = new File(attachmentPath) ;

    @Autowired
    private AttachmentRepository attachmentRepository;
    
    public AttachmentService() {
        if (!attachmentFile.exists()) {
            attachmentFile.mkdirs();
        }
    }
    public void saveAttachment(List<MultipartFile> multipartFiles,Long mailId){
        try {
            int index = 0;
            for(MultipartFile multipartFile : multipartFiles){
                String orignatfileName = multipartFile.getOriginalFilename();
                String newFileName = "attachment_" + mailId + "_" + index + "_" + orignatfileName;
                File newFile = new File(attachmentFile,newFileName);
                multipartFile.transferTo(newFile);
                String path = newFile.getAbsolutePath();
                System.out.println(path);
                System.out.println(newFile.getAbsolutePath());
                
                Attachment attachment1 = new Attachment(orignatfileName,newFile.getAbsolutePath(),mailId);
                attachmentRepository.save(attachment1);
                index++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    // public List<File> changeMultipartFileToFile(List<MultipartFile> multipartFiles){
    //     List<File> files = new ArrayList<>();
    //     for(MultipartFile multipartFile : multipartFiles){
    //         File file = new File(multipartFile.getOriginalFilename());
    //         try {
    //             multipartFile.transferTo(file); 
    //             files.add(file);
    //         } catch (IOException e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return files;
    // }
    // public List<MultipartFile> getAttachmentsByMailId(Long mailId){
    //      List<Attachment> attachments = attachmentRepository.findByMailId(mailId);
    //      System.out.println(attachments);
    //      for(Attachment attachment : attachments){
    //         File file = new File(attachment.getPath());
    //         System.out.println(file.getAbsolutePath());
    //         MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(), "application/octet-stream", file.toByteArray());
    //         multipartFiles.add(multipartFile);
    //      }

    //      return attachments;

    // }

}
