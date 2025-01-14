package com.immunologyHomepage.common;

public interface ResponseMessage {
     //HTTP Status 200
     String SUCCESS = "Success";

     //HTTP Status 400
     String VALIDATION_FAILED = "Validation faild";
     String NOT_EXISTED_BOARD = "This board does not exist";
     String NOT_EXISTED_USER = "This user is not exist";
     String SIGN_IN_FAIL = "Sign in failed";
     String DUPLICATE_USERNAME ="Duplicated userName";
 
     //HTTP Status 500
     String DATABASE_ERROR = "Database error";
    
}
