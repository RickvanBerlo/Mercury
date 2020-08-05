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
import java.util.Arrays;
import java.util.Collection;
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
    public ResponseEntity<FileInfo> createDir(@RequestBody String path) {
        Path storedPath = fileStorageService.createDir(path);
        String contentType = "";
        try {
            contentType = Files.probeContentType(storedPath);
        } catch (IOException e) {
            throw new FileStorageException("no contentType found", e);
        }
        File storedfile = storedPath.toFile();
        FileInfo fileInfo = new FileInfo(storedfile.getName(), createRelativePath(storedPath), contentType,
                storedfile.lastModified(), storedfile.length());
        return new ResponseEntity<>(fileInfo, HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/dir", method = RequestMethod.GET)
    public ResponseEntity<Directory> getContent(@RequestParam String path) {
        List<FileInfo> files = this.fileStorageService.getContent(path).map(filePath -> {
            File file = new File(filePath.toAbsolutePath().toString());
            String contentType = "";
            try {
                contentType = Files.probeContentType(filePath);
            } catch (IOException e) {
                throw new FileStorageException("no contentType found", e);
            }
            return new FileInfo(file.getName(), createRelativePath(filePath), contentType, file.lastModified(),
                    file.length());
        }).collect(Collectors.toList());
        return new ResponseEntity<>(new Directory(path, files), HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/dir", method = RequestMethod.DELETE)
    public ResponseEntity<FileInfo> deleteDir(@RequestBody String path) {
        fileStorageService.deleteDirectory(path);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/storage/file", method = RequestMethod.POST)
    public FileInfo uploadFile(@RequestParam("files") MultipartFile file, @RequestParam("path") String path) {
        Path storedPath = fileStorageService.storeFile(file, path);

        String contentType = "";
        try {
            contentType = Files.probeContentType(storedPath);
        } catch (IOException e) {
            throw new FileStorageException("no contentType found", e);
        }
        File storedfile = storedPath.toFile();

        return new FileInfo(storedfile.getName(), createRelativePath(storedPath), contentType,
                storedfile.lastModified(), storedfile.length());
    }

    @RequestMapping(value = "/storage/files", method = RequestMethod.POST)
    public List<FileInfo> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,
            @RequestParam("path") String path) {
        return Arrays.asList(files).stream().map(file -> uploadFile(file, path)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/storage/file/{path:.+}", method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(@PathVariable String path, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(path);

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
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; path=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @RequestMapping(value = "/storage/file", method = RequestMethod.DELETE)
    public ResponseEntity<FileInfo> deleteFile(@RequestBody FileInfo file) {
        fileStorageService.deleteFile(file.getPath());
        return new ResponseEntity<>(file, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/storage/files", method = RequestMethod.DELETE)
    public ResponseEntity<FileInfo> deleteFiles(@RequestBody Collection<FileInfo> files) {
        for (FileInfo fileInfo : files) {
            if (fileInfo.getSize() == 0) {
                fileStorageService.deleteDirectory(fileInfo.getPath());
            } else {
                fileStorageService.deleteFile(fileInfo.getPath());
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private String createRelativePath(Path path) {
        return '/' + fileStorageService.getFileStorageLocation().relativize(path).toString().replace('\\', '/');
    }
}