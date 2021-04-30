import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  Title: string;
  id: number;
  Artist: string;
  ReleaseDate: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { id: 1, Title: 'Hydrogen', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 2, Title: 'Helium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 3, Title: 'Lithium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 4, Title: 'Beryllium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 5, Title: 'Boron', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 6, Title: 'Carbon', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 7, Title: 'Nitrogen', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 8, Title: 'Oxygen', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 9, Title: 'Fluorine', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 10, Title: 'Neon', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 11, Title: 'Sodium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 12, Title: 'Magnesium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 13, Title: 'Aluminum', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 14, Title: 'Silicon', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 15, Title: 'Phosphorus', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 16, Title: 'Sulfur', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 17, Title: 'Chlorine', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 18, Title: 'Argon', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 19, Title: 'Potassium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
  { id: 20, Title: 'Calcium', Artist: "Brintney", ReleaseDate: "2/12/2020" },
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**name
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Title': return compare(a.Title, b.Title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'Artist': return compare(+a.id, +b.id, isAsc);
        case 'ReleaseDate': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
