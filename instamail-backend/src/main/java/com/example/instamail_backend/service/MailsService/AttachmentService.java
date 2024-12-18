package com.example.instamail_backend.service.MailsService;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.instamail_backend.model.Attachment;
import com.example.instamail_backend.repository.AttachmentRepository;

@Service
public class AttachmentService {
    private final String attachmentPath = "/Users/omar_zydan/programming/fullStack/Lab3/InstaMail/instamail-backend/attachements";

    File attachmentFile = new File(attachmentPath);

    @Autowired
    private AttachmentRepository attachmentRepository;

    public AttachmentService() {
        if (!attachmentFile.exists()) {
            attachmentFile.mkdirs();
        }
    }

    public void saveAttachment(List<MultipartFile> multipartFiles, Long mailId) {
        try {
            int index = 0;
            for (MultipartFile multipartFile : multipartFiles) {
                String orignatfileName = multipartFile.getOriginalFilename();
                String newFileName = "attachment_" + mailId + "_" + index + "_" + orignatfileName;
                File newFile = new File(attachmentFile, newFileName);
                multipartFile.transferTo(newFile);
                String path = newFile.getAbsolutePath();
                System.out.println(path);
                System.out.println(newFile.getAbsolutePath());

                Attachment attachment1 = new Attachment(orignatfileName, newFile.getAbsolutePath(), mailId);
                attachmentRepository.save(attachment1);
                index++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Attachment> getAttachmentsByMailId(Long mailId) {
        List<Attachment> attachments = attachmentRepository.findByMailId(mailId);
        System.out.println(attachments);
        return attachments;
    }

    public Map<String, Object> getAttachmentById(Long attachmentId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new RuntimeException("Attachment not found"));
        File file = new File(attachment.getPath());
        Map<String, Object> response = new HashMap<>();
        response.put("file", file);
        response.put("name", attachment.getName());
        return response;
    }

}
