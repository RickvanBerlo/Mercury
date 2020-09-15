package com.mercury.api;

import com.mercury.api.controller.PreferencesController;
import com.mercury.api.model.preferences.Image;
import com.mercury.api.model.preferences.Preferences;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class PreferenceControllerTests {
    @Autowired
    private PreferencesController preferencesController;

    @Test
    @Order(1)
    public void getInitPreferences() {
        Preferences pref = preferencesController.getPreferences().getBody();
        Assertions.assertEquals(pref.isClock(), false);
        Assertions.assertEquals(pref.isDarkmode(), false);
    }

    @Test
    @Order(2)
    public void PostPreferences() {
        Preferences pref = preferencesController.savePreferences(new Preferences(true, true, new Image())).getBody();
        Assertions.assertEquals(pref.isClock(), true);
        Assertions.assertEquals(pref.isDarkmode(), true);
    }
}
