package com.mercury.api.service.weblink;

import java.util.List;
import java.util.Optional;

import com.mercury.api.model.weblink.Weblink;
import com.mercury.api.repository.WeblinkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeblinkService {

    @Autowired
    private WeblinkRepository WeblinkRepository;

    public Weblink save(Weblink weblink) {
        return WeblinkRepository.save(weblink);
    }

    public List<Weblink> findAll() {
        return WeblinkRepository.findAll();
    }

    public Optional<Weblink> findById(String id) {
        return WeblinkRepository.findById(id);
    }

    public void deleteById(String id) {
        WeblinkRepository.deleteById(id);
    }

    public void deleteAll() {
        WeblinkRepository.deleteAll();
    }
}