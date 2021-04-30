import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class GetMusicService {

  constructor(private http: HttpClient) { }

  public getMusic() {
    return this.http.get("http://localhost:3001/api/lists")
  }
}
