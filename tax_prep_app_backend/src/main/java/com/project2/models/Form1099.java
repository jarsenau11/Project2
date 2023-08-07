package com.project2.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Document(collection = "form_1099")
@Data public class Form1099 {

    @Id
    private String id;

    @Pattern(regexp = "\\d{9}", message = "The field must contain exactly 9 digits.")
    private String payerTin;

    private String payerName;
    private String payerStreet1;
    private String payerStreet2;
    private String payerCity;
    private String payerState;
    private int payerZip;

    @Pattern(regexp = "\\d{9}", message = "The field must contain exactly 9 digits.")
    private String recipientTin;

    private double taxesWithheld;
    private double totalCompensation;

    @DBRef
    private AppUser user;

    @DBRef
    private TaxFiling taxFiling;

    // Getters and setters (you can use Lombok's @Data annotation if you prefer)
}
