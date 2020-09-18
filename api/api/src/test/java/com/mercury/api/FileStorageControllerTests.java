package com.mercury.api;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.mercury.api.controller.FileStorageController;
import com.mercury.api.model.fileStorage.Directory;
import com.mercury.api.model.fileStorage.FileInfo;

import org.junit.jupiter.api.Test;
import org.apache.commons.compress.utils.IOUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
public class FileStorageControllerTests {
    private String relativePath;

    @Autowired
    private FileStorageController fileStorageController;

    FileStorageControllerTests() {
        Long time = new Timestamp(System.currentTimeMillis()).getTime();
        relativePath = "/" + time.toString() + "/";
    }

    @PostConstruct
    public void init() {
        fileStorageController.createDir(relativePath);
    }

    @Test
    @Order(1)
    public void getEmptyDir() {
        Directory dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(dir.getPath(), relativePath);
        Assertions.assertTrue(dir.getFiles().isEmpty());
    }

    @Test
    @Order(9)
    public void getFilledDir() {
        MultipartFile multipartFile = null;
        File file;
        try {
            file = new File("test.txt");
            System.out.println(file.getAbsolutePath());
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        fileStorageController.uploadFile(multipartFile, relativePath);
        Directory dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(dir.getPath(), relativePath);
        Assertions.assertTrue(!dir.getFiles().isEmpty());
        System.gc();
        file.delete();
    }

    @Test
    @Order(4)
    public void uploadFile() {
        MultipartFile multipartFile = null;
        File file;
        try {
            file = new File("test.txt");
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        FileInfo fileInfo = fileStorageController.uploadFile(multipartFile, relativePath);
        Assertions.assertEquals(fileInfo.getFileName(), "test.txt");
        System.gc();
        file.delete();
    }

    @Test
    @Order(2)
    public void createDir() {
        fileStorageController.createDir(relativePath + "foo");
        Directory dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(dir.getFiles().get(0).getFileName(), "foo");
    }

    @Test
    @Order(3)
    public void deleteDir() {
        fileStorageController.createDir(relativePath + "foo");
        Directory dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(dir.getFiles().get(0).getFileName(), "foo");

        fileStorageController.deleteDir(relativePath + "foo");
        dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertTrue(dir.getFiles().isEmpty());

    }

    @Test
    @Order(5)
    public void deleteFile() {
        MultipartFile multipartFile = null;
        File file;
        try {
            file = new File("test.txt");
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        FileInfo fileInfo = fileStorageController.uploadFile(multipartFile, relativePath);
        Assertions.assertEquals(fileInfo.getFileName(), "test.txt");

        fileStorageController.deleteFile(fileInfo);
        Directory dir = fileStorageController.getContent(relativePath).getBody();

        Assertions.assertTrue(dir.getFiles().isEmpty());
        System.gc();
        file.delete();
    }

    @Test
    @Order(6)
    public void deleteFiles() {
        MultipartFile multipartFile = null;
        Directory dir = null;
        File file;
        File file2;
        // make file 1
        try {
            file = new File("test.txt");
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        FileInfo fileInfo1 = fileStorageController.uploadFile(multipartFile, relativePath);
        dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(fileInfo1.getFileName(), "test.txt");
        Assertions.assertTrue(!dir.getFiles().isEmpty());
        // make file 2
        try {
            file2 = new File("test2.txt");
            if (!file2.createNewFile())
                System.out.println("File already exists.");
                FileInputStream input = new FileInputStream(file2);
                    multipartFile = new MockMultipartFile("test2.txt", 
                    file2.getName(), "text/plain",
                    IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        FileInfo fileInfo2 = fileStorageController.uploadFile(multipartFile, relativePath);
        dir = fileStorageController.getContent(relativePath).getBody();
        Assertions.assertEquals(fileInfo2.getFileName(), "test2.txt");
        Assertions.assertTrue(!dir.getFiles().isEmpty());
        // delete files

        fileStorageController.deleteFiles(new ArrayList<>(Arrays.asList(fileInfo1, fileInfo2)));
        dir = fileStorageController.getContent(relativePath).getBody();

        Assertions.assertTrue(dir.getFiles().isEmpty());
        System.gc();
        file.delete();
        file2.delete();
    }

    @Test
    @Order(7)
    public void downloadFile() {
        MultipartFile multipartFile = null;
        File file;
        try {
            file = new File("test.txt");
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        fileStorageController.uploadFile(multipartFile, relativePath);

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getServletContext()).thenReturn(mock(ServletContext.class));

        HttpStatus httpstatus = fileStorageController.downloadFile(relativePath.substring(1) + "test.txt", request)
                .getStatusCode();
        Assertions.assertEquals(httpstatus.value(), 200);
        System.gc();
        file.delete();
    }

    @Test
    @Order(8)
    public void uploadFiles() {
        MultipartFile multipartFile = null;
        File file;
        try {
            file = new File("test.txt");
            if (!file.createNewFile())
                System.out.println("File already exists.");
            FileInputStream input = new FileInputStream(file);
            multipartFile = new MockMultipartFile("test.txt", file.getName(), "text/plain", IOUtils.toByteArray(input));
        } catch (IOException e) {
            throw new RuntimeException("nope", e);
        }
        MultipartFile[] files = { multipartFile };
        List<FileInfo> infos = fileStorageController.uploadMultipleFiles(files, relativePath);

        Assertions.assertEquals(infos.get(0).getFileName(), "test.txt");
        System.gc();
        file.delete();
    }
}