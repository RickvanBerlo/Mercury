package com.mercury.api.service.preferences;

import java.util.Optional;

import com.mercury.api.model.preferences.Preferences;
import com.mercury.api.repository.PreferencesRepository;
import com.mercury.api.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreferenceService extends BaseService {
    @Autowired
    private PreferencesRepository preferencesRepository;

    public Preferences save(Preferences preferences) {
        preferences.setUserId(this.getUserId());
        return preferencesRepository.save(preferences);
    }

    public Optional<Preferences> get() {
        return preferencesRepository.findById(this.getUserId());
    }
}
