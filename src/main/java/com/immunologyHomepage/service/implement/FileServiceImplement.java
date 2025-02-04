package com.immunologyHomepage.service.implement;

import java.io.File;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

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
            System.out.println("Storage location: " + directory.getAbsolutePath());
        } catch (Exception e) {
            throw new RuntimeException("Could not create upload directory!");
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
            
            Path targetPath = Paths.get(filePath).resolve(saveFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            
            System.out.println("File saved at: " + targetPath.toAbsolutePath());
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
            Path filePath = Paths.get(this.filePath).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (Exception e) {
            throw new RuntimeException("File not found: " + fileName, e);
        }
    }
}