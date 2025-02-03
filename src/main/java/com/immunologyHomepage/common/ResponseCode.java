package com.immunologyHomepage.common;

public interface ResponseCode {

    // public static final String SUCCESS = "SU";

    //HTTP Status 200
    String SUCCESS = "SU";

    //HTTP Status 400
    String VALIDATION_FAILED = "VF";
    String NOT_EXISTED_BOARD = "NB";
    String NOT_EXISTED_USER = "NU";
    String SIGN_IN_FAIL = "SF";
    String DUPLICATE_USERNAME ="DU";
    //HTTP Status 500
    String DATABASE_ERROR = "DE";
    String NO_PERMISSION = "NP";
    
}
