package com.mercury.api;

import java.util.List;

import com.mercury.api.controller.WeblinksController;
import com.mercury.api.model.weblink.Weblink;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
class WeblinksControllerTests {

    @Autowired
    private WeblinksController weblinkController;

    @Test
    public void getEmptyWeblinks() {
        weblinkController.deleteWeblinks();
        List<Weblink> weblinks = weblinkController.getWeblinks().getBody();
        Assertions.assertTrue(weblinks.isEmpty());
    }

    @Test
    public void addWeblink() {
        String title = "google";
        Weblink notes = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        Assertions.assertTrue(notes.getTitle() == title);
    }

    @Test
    public void getWeblinks() {
        String title = "google";
        weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"));
        List<Weblink> weblinks = weblinkController.getWeblinks().getBody();
        Assertions.assertFalse(weblinks.isEmpty());
        Assertions.assertEquals(weblinks.get(0).getTitle(), title);
    }

    @Test
    public void getWeblink() {
        String title = "google";
        Weblink weblink = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        HttpStatus statuscode = weblinkController.getWeblink(weblink.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 200);
    }

    @Test
    public void deleteWeblink() {
        String title = "google";
        Weblink weblink = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        HttpStatus statuscode = weblinkController.deleteWeblink(weblink.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void deleteWeblinks() {
        String title = "google";
        weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"));
        weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"));
        HttpStatus statuscode = weblinkController.deleteWeblinks().getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void replaceWeblink() {
        String title = "google";
        String replacedTitle = "giggidy";
        String id = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff")).getBody()
                .getId();
        Weblink note = weblinkController
                .replaceWeblink(id, new Weblink(replacedTitle, "https://www.google.nl/", "#ffffff")).getBody();
        Assertions.assertEquals(note.getTitle(), replacedTitle);
    }

}
