import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetMusicService } from 'src/app/get-music.service';
import { MusicList } from 'src/musicList';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  ELEMENT_DATA: MusicList[] = [];
  displayColumns: string[] = ["id", "title", "artist", "releaseDate", "price"]
  dataSource = new MatTableDataSource<MusicList>(this.ELEMENT_DATA);
  //data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private service: GetMusicService) { }

  ngOnInit() {
    this.getAllMusic();
  }

  public getAllMusic() {
    let resp = this.service.getMusic();
    resp.subscribe(list => this.dataSource.data = list as MusicList[])
    resp.subscribe(data => { console.log(JSON.stringify(data)) })

  }

  /**name
  * Connect this data source to the table. The table will only update when
  * the returned stream emits new items.
  * @returns A stream of the items to be rendered.
  */
  connect(): Observable<MusicList[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.dataSource.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.dataSource.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  private getPagedData(data: MusicList[]): MusicList[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  private getSortedData(data: MusicList[]): MusicList[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'Artist': return compare(+a.id, +b.id, isAsc);
        case 'ReleaseDate': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
