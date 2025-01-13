package com.immunologyHomepage.common;

public interface ResponseMessage {
     //HTTP Status 200
     String SUCCESS = "Success";

     //HTTP Status 400
     String VALIDATION_FAILED = "Validation faild";
     String NOT_EXISTED_BOARD = "This board does not exist";
     String NOT_EXISTED_USER = "This user is not exist";
 
     //HTTP Status 500
     String DATABASE_ERROR = "Database error";
    
}
