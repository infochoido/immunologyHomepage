package com.immunologyHomepage.service.implement;

import java.io.File;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import jakarta.annotation.PostConstruct;

import com.immunologyHomepage.service.FileService;

@Service
@RequiredArgsConstructor
public class FileServiceImplement implements FileService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    @PostConstruct
    public void init() {
        try {
            File directory = new File(filePath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            System.out.println("Upload directory created at: " + directory.getAbsolutePath());
        } catch (Exception e) {
            throw new RuntimeException("Could not create upload folder!");
        }
    }

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            if (file.isEmpty()) return null;

            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) return null;

            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String uuid = UUID.randomUUID().toString();
            String saveFileName = uuid + extension;
            
            File targetFile = new File(filePath + File.separator + saveFileName);
            file.transferTo(targetFile);
            
            System.out.println("File saved at: " + targetFile.getAbsolutePath());
            return saveFileName;
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Resource getImage(String fileName) {
        try {
            Path path = Paths.get(filePath + fileName);
            Resource resource = new UrlResource(path.toUri());
            
            if (resource.exists()) {
                return resource;
            }
            System.out.println("파일을 찾을 수 없음: " + fileName);
            return null;
        } catch (Exception e) {
            System.err.println("이미지 로드 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path path = Paths.get(filePath + fileName);
            Resource resource = new UrlResource(path.toUri());
            
            if (resource.exists()) {
                return resource;
            }
            System.out.println("파일을 찾을 수 없음: " + fileName);
            return null;
        } catch (Exception e) {
            System.err.println("파일 로드 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}