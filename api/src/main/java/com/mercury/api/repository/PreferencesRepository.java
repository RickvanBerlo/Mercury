package com.mercury.api.repository;

import com.mercury.api.model.preferences.Preferences;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PreferencesRepository extends MongoRepository<Preferences, String> {
}
