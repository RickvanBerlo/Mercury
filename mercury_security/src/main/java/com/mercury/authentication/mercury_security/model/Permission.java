package com.mercury.authentication.mercury_security.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "permission")
@Data
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "name")
    private String name;
}