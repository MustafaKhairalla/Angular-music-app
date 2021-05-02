import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetMusicService } from 'src/app/get-music.service';
import { MusicList } from 'src/musicList';



@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  ELEMENT_DATA: MusicList[] = [];
  displayColumns: string[] = ["id", "title", "artist", "releaseDate", "price"]
  dataSource = new MatTableDataSource<MusicList>(this.ELEMENT_DATA);

  constructor(private service: GetMusicService) { }

  ngOnInit() {
    this.getAllMusic();
  }

  public getAllMusic() {
    let resp = this.service.getMusic();
    resp.subscribe(list => this.dataSource.data = list as MusicList[])
    resp.subscribe(data => { console.log(JSON.stringify(data)) })
  }

}
