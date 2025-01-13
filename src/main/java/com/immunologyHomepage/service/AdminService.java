package com.immunologyHomepage.service;

public interface AdminService {

    // userString과 password 필드는 인터페이스에서 선언하지 않고,
    // 해당 필드를 사용하는 메서드를 정의합니다.

    // 관리자 이름을 반환하는 메서드
    String getUserName();

    // 관리자 이름을 설정하는 메서드
    void setUserName(String userString);

    // 비밀번호를 반환하는 메서드
    String getPassword();

    // 비밀번호를 설정하는 메서드
    void setPassword(String password);
}