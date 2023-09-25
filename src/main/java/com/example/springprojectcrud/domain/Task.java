package com.example.springprojectcrud.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@Table(name="task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="description")
    private String description;

    @Enumerated(value=EnumType.ORDINAL)
    private Status status;
}
