package com.mercury.api.service.fileStorage;

import com.mercury.api.exception.FileStorageException;
import com.mercury.api.model.fileStorage.FileStorage;
import com.mercury.api.service.BaseService;
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
public class FileStorageService extends BaseService {
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

    private Path GetPath(String path){
        return Paths.get(GetRootPath() + path);
    }

    private Path GetRootPath() {
        try {
            if (!Files.exists(Paths.get(this.fileStorageLocation + "/" + this.getUserId())))
                Files.createDirectories(Paths.get(this.fileStorageLocation + "/" + this.getUserId()));
            return Paths.get(this.fileStorageLocation + "/" + this.getUserId());
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory for this specific user", ex);
        }
    }

    public Stream<Path> getContent(String path) {
        Path storedPath = GetPath(path);
        try {
            return Files.walk(storedPath, 1).skip(1);
        } catch (IOException ex) {
            throw new FileStorageException("Could not create path:" + storedPath.toFile().getPath(), ex);
        }
    }

    public Path createDir(String path) {
        Path savedPath = GetPath(path);
        try {
            Files.createDirectories(savedPath);
            return savedPath;
        } catch (IOException ex) {
            throw new FileStorageException("Could not create path:" + savedPath.toFile().getPath(), ex);
        }
    }

    public Path storeFile(MultipartFile file, String path) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {

            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation = GetRootPath();
            for (String subDirectory : path.split("/")) {
                targetLocation = targetLocation.resolve(subDirectory);
            }
            targetLocation = targetLocation.resolve(fileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return targetLocation;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String path) {
        try {
            Path filePath = GetRootPath().resolve(path).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + path);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + path, ex);
        }
    }

    public boolean deleteDirectory(String path) {
        File directory = new File(GetPath(path).toString());
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                if (file.isDirectory())
                    deleteDirectory(createRelativePath(file.toPath()));
                else
                    deleteFile(file);
            }
        }
        return directory.delete();
    }

    public boolean deleteFile(String path) {
        try {
            return new File(GetPath(path).toString()).delete();
        } catch (SecurityException e) {
            throw new FileStorageException("could not remove file: " + path, e);
        }
    }

    public boolean deleteFile(File file) {
        try {
            return file.delete();
        } catch (SecurityException e) {
            throw new FileStorageException("could not remove file: " + file.getPath(), e);
        }
    }

    public String createRelativePath(Path path) {
        return '/' + GetRootPath().relativize(path).toString().replace('\\', '/');
    }

}