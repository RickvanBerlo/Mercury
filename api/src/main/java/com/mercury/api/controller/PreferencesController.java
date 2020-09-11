package com.mercury.api.controller;

import java.util.Optional;
import com.mercury.api.model.preferences.Preferences;
import com.mercury.api.service.preferences.PreferenceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PreferencesController {
    @Autowired
    private PreferenceService service;

    @RequestMapping(value = "/preferences", method = RequestMethod.GET)
    public ResponseEntity<Preferences> getPreferences() {
        try {
            Optional<Preferences> pref = service.get();
            if(!pref.isPresent()){
                Preferences savedPreferences = service.save(new Preferences(false, false));
                return new ResponseEntity<>(savedPreferences, HttpStatus.OK);
            }
            return new ResponseEntity<>(pref.get().CreateResponseInstant(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/preferences", method = RequestMethod.POST)
    public ResponseEntity<Preferences> savePreferences(@RequestBody Preferences preferences) {
        try {
            Preferences savedPreferences = service.save(preferences);
            return new ResponseEntity<>(savedPreferences.CreateResponseInstant(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
