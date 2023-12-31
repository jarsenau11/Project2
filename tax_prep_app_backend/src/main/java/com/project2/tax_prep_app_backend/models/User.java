package com.project2.tax_prep_app_backend.models;

import java.util.ArrayList;
// import java.util.Collection;
// import java.util.HashSet;
import java.util.List;
// import java.util.Set;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@NoArgsConstructor
@Document(collection = "users")
@Data public class User {
    
    @Id    
    private String id;
    
    @NotBlank
    @Indexed(unique = true)
    private String username;
    
    @NotBlank
    private String password;    

    private boolean enabled;
    
    // Must include @Field annotation with DB field name if variable name is different than field in DB
    @Field("user_detail")
    private UserDetail userDetail;
    
    @Field("tax_filings")
    private TaxFiling taxFilings;

    @Field("form_w2s")
    private List<FormW2> formW2s = new ArrayList<>();   // initialize to avoid null pointer exceptions

    @Field("form_1099s")
    private List<Form1099> form1099s = new ArrayList<>();  // initialize to avoid null pointer exceptions   

}
