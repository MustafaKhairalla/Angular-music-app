import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class GetMusicService {

  constructor(private http: HttpClient) { }

  public getMusic() {
    //console.log("this is the music api");
    let data = this.http.get("api/")
    return data;
  }
}
