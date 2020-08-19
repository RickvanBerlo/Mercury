package com.mercury.authentication.mercury_security.service;

import java.util.Optional;

import com.mercury.authentication.mercury_security.model.User;
import com.mercury.authentication.mercury_security.model.UserDetail;
import com.mercury.authentication.mercury_security.repository.UserDetailRespository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserDetailRespository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = repository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Username/Password is incorrect!"));

        UserDetail userDetail = new UserDetail(user.get());

        new AccountStatusUserDetailsChecker().check(userDetail);
        return userDetail;
    }

}