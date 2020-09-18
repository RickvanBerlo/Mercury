package com.mercury.api;

import java.util.List;

import com.mercury.api.controller.WeblinksController;
import com.mercury.api.model.weblink.Weblink;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class WeblinksControllerTests {

    @Autowired
    private WeblinksController weblinkController;

    @Test
    @Order(1)
    public void getEmptyWeblinks() {
        List<Weblink> weblinks = weblinkController.getWeblinks().getBody();
        Assertions.assertTrue(weblinks.isEmpty());
    }

    @Test
    @Order(2)
    public void addWeblink() {
        String title = "google";
        Weblink notes = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        Assertions.assertTrue(notes.getTitle() == title);
    }

    @Test
    @Order(3)
    public void getWeblinks() {
        String title = "google";
        weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"));
        List<Weblink> weblinks = weblinkController.getWeblinks().getBody();
        Assertions.assertFalse(weblinks.isEmpty());
        Assertions.assertEquals(weblinks.get(0).getTitle(), title);
    }

    @Test
    @Order(4)
    public void getWeblink() {
        String title = "google";
        Weblink weblink = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        HttpStatus statuscode = weblinkController.getWeblink(weblink.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 200);
    }

    @Test
    @Order(5)
    public void deleteWeblink() {
        String title = "google";
        Weblink weblink = weblinkController.createWeblink(new Weblink(title, "https://www.google.nl/", "#ffffff"))
                .getBody();
        HttpStatus statuscode = weblinkController.deleteWeblink(weblink.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    @Order(6)
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
