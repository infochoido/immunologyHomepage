package com.immunologyHomepage.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.immunologyHomepage.service.FileService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/file") // "/file" 경로로 요청을 받음
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload") // "/file/upload" 경로로 POST 요청을 받음
    public String upload(
        @RequestParam("file") MultipartFile file
    ){
        System.out.println("File upload requested");
        String url = fileService.upload(file);
        if (url == null) {
            return "파일 업로드 실패";
        }
        return url;
    }

    @GetMapping(value = "{fileName}", produces={MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getImage(
        @PathVariable String fileName
    ){
        Resource resource = fileService.getImage(fileName);
        return resource;
    }
    
}
