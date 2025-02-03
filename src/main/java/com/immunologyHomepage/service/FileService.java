package com.immunologyHomepage.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String uploadFile(MultipartFile file);
    Resource getImage(String fileName);
    Resource loadFileAsResource(String fileName);
}
