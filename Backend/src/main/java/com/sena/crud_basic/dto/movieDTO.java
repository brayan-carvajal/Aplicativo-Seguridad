package com.sena.crud_basic.dto;

public class movieDTO {
    private int idMovie;
    private String title;
    private String description;
    private String gender;
    private int duration;
    private String imgUrl;

    public movieDTO(){
    }

    public movieDTO(int idMovie, String title, String description,  String gender, int duration, String imgUrl) {
        this.idMovie = idMovie;
        this.title = title;
        this.description = description;
        this.gender = gender;
        this.duration = duration;
        this.imgUrl = imgUrl;
    }

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
 
}
