package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "movie")
public class movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMovie")
    private int idMovie;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "description", length = 500, nullable = false)
    private String description;

    @Column(name = "gender", length = 50, nullable = false)
    private String gender;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "imgUrl", length = 255, nullable = false)
    private String imgUrl;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // Constructor vacio
    public movie() {
    }

    // Constructor
    public movie(int idMovie, String title, String description, String gender, int duration, String imgUrl, boolean status) {
        this.idMovie = idMovie;
        this.title = title;
        this.description = description;
        this.gender = gender;
        this.duration = duration;
        this.imgUrl = imgUrl;
        this.status = status;
    }

    // Getters y Setters
    public int getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(int idMovie) {
        this.idMovie = idMovie;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
