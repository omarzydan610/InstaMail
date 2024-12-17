package com.example.instamail_backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "attachments")
@Getter
@Setter
public class Attachment { // Correct class name
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String path;

    private long mailId;



    public Attachment() {
    }

    public Attachment(String name,String path, long mailId) {
        this.name = name;
        this.path = path;
        this.mailId = mailId;
    }
}
