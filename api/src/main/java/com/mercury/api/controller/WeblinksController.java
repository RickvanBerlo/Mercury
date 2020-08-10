package com.mercury.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.weblink.Weblink;
import com.mercury.api.service.weblink.WeblinkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeblinksController {

    @Autowired
    private WeblinkService service;

    @RequestMapping(value = "/weblinks", method = RequestMethod.POST)
    public ResponseEntity<Weblink> createWeblink(@RequestBody Weblink weblink) {
        try {
            Weblink savedWeblink = service.save(new Weblink(weblink.getTitle(), weblink.getUrl(), weblink.getColor()));
            return new ResponseEntity<>(savedWeblink, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/weblinks", method = RequestMethod.GET)
    public ResponseEntity<List<Weblink>> getWeblinks() {
        List<Weblink> weblinks = new ArrayList<>();
        try {
            weblinks = service.findAll();
            return new ResponseEntity<>(weblinks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/weblinks/{id}", method = RequestMethod.GET)
    public ResponseEntity<Weblink> getWeblink(@PathVariable("id") String id) {
        try {
            Optional<Weblink> weblink = service.findById(id);
            return new ResponseEntity<>(weblink.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/weblinks/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Weblink> replaceWeblink(@PathVariable("id") String id, @RequestBody Weblink weblink) {
        Optional<Weblink> retrived_weblink = service.findById(id);

        if (retrived_weblink.isPresent()) {
            Weblink _weblink = retrived_weblink.get();
            _weblink.setTitle(weblink.getTitle());
            _weblink.setUrl(weblink.getUrl());
            _weblink.setColor(weblink.getColor());
            return new ResponseEntity<>(service.save(_weblink), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/weblinks/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Weblink> deleteWeblink(@PathVariable("id") String id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/weblinks", method = RequestMethod.DELETE)
    public ResponseEntity<Weblink> deleteWeblinks() {
        try {
            service.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}