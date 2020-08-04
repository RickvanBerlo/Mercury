package com.mercury.api.service.fileStorage;

import com.mercury.api.exception.FileStorageException;
import com.mercury.api.model.fileStorage.FileStorage;
import com.mercury.api.exception.FileNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorage fileStorage) {
        this.fileStorageLocation = Paths.get(fileStorage.getLocation()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public Stream<Path> getContent(String folder) {
        Path path = Paths.get(this.fileStorageLocation.toAbsolutePath().toString() + "\\" + folder);
        try {
            return Files.walk(path, 1).skip(1);
        } catch (IOException ex) {
            throw new FileStorageException("Could not create path:" + path.toAbsolutePath(), ex);
        }
    }

    public Path createFolder(String path) {
        Path savedPath = Paths.get(this.fileStorageLocation + "\\" + path);
        try {
            Files.createDirectories(savedPath);
            return savedPath;
        } catch (IOException ex) {
            throw new FileStorageException("Could not create path:" + savedPath.toAbsolutePath(), ex);
        }
    }

    public Path storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return targetLocation;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
    }
}