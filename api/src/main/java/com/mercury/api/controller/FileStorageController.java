package com.mercury.api.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.servlet.http.HttpServletRequest;

import com.mercury.api.exception.FileStorageException;
import com.mercury.api.model.fileStorage.Directory;
import com.mercury.api.model.fileStorage.FileInfo;
import com.mercury.api.service.fileStorage.FileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileStorageController {
    @Autowired
    private FileStorageService fileStorageService;

    @RequestMapping(value = "/storage/dir", method = RequestMethod.POST)
    public ResponseEntity<FileInfo> createDir(@RequestBody String dir) {
        Path path = fileStorageService.createFolder(dir);
        String contentType = "";
        try {
            contentType = Files.probeContentType(path);
        } catch (IOException e) {
            throw new FileStorageException("no contentType found", e);
        }
        File storedfile = path.toFile();
        FileInfo fileInfo = new FileInfo(storedfile.getName(), storedfile.getAbsolutePath(), contentType,
                storedfile.lastModified(), storedfile.length());
        return new ResponseEntity<>(fileInfo, HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/dir", method = RequestMethod.GET)
    public ResponseEntity<Directory> getContent(@RequestParam String path) {
        if (path.isEmpty())
            path = "";
        List<FileInfo> files = this.fileStorageService.getContent(path).map(filePath -> {
            File file = new File(filePath.toAbsolutePath().toString());
            String contentType = "";
            try {
                contentType = Files.probeContentType(filePath);
            } catch (IOException e) {
                throw new FileStorageException("no contentType found", e);
            }
            return new FileInfo(file.getName(), file.getAbsolutePath(), contentType, file.lastModified(),
                    file.length());
        }).collect(Collectors.toList());
        return new ResponseEntity<>(new Directory(path, files), HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/dir", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteDir(@RequestParam("dir") String dir) {
        fileStorageService.createFolder(dir);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/file", method = RequestMethod.POST)
    public FileInfo uploadFile(@RequestParam("file") MultipartFile file) {
        Path path = fileStorageService.storeFile(file);

        String contentType = "";
        try {
            contentType = Files.probeContentType(path);
        } catch (IOException e) {
            throw new FileStorageException("no contentType found", e);
        }
        File storedfile = path.toFile();

        return new FileInfo(storedfile.getName(), storedfile.getAbsolutePath(), contentType, storedfile.lastModified(),
                storedfile.length());
    }

    @RequestMapping(value = "/storage/files", method = RequestMethod.POST)
    public List<FileInfo> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/storage/file/{fileName:.+}", method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new RuntimeException("could not determine file type!");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}