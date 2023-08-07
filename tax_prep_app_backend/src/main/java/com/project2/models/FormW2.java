package com.project2.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Document(collection = "form_w2")
@Data public class FormW2 {

    @Id
    private String id;

    // Validation constraint that forces 9 digits
    @Pattern(regexp = "\\d{9}", message = "The field must contain exactly 9 digits.")
    private String ein;

    private String employerName;
    private String employerStreet1;
    private String employerStreet2;
    private String employerCity;
    private String employerState;
    private int zip;
    private double wages;
    private double taxesWithheld;
    private double ssWithheld;
    private double medicareWithheld;

    @DBRef
    private AppUser user;

    @DBRef
    private UserDetail ssn;

    @DBRef
    private TaxFiling taxFiling;
    
}
