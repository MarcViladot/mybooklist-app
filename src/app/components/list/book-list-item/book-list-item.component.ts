import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Added} from '../../../interfaces/added';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ListService} from '../../../services/list.service';
import {Router} from '@angular/router';
import {EditListDialogComponent} from '../edit-list-dialog/edit-list-dialog.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() addeds: Added[];
  @Input() listOwner = false;
  sortPetition = false;

  constructor(private listService: ListService,
              public dialog: MatDialog,
              private router: Router) {
    this.listService.arraySorted.subscribe(array => this.sort(array));
  }

  ngOnInit(): void {
    // TODO SORT BY NAME DEFAULT (API)
  }

  private sort(addeds: Added[]): void {
    if (this.sortPetition) {
      this.addeds = addeds;
    }
    this.sortPetition = false;
  }

  sortAddeds(value: string) {
    this.sortPetition = true;
    this.listService.sortArray(this.addeds, value);
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

  editAdded(added: Added): void {
    let dialogRef = this.dialog.open(EditListDialogComponent, {
      height: 'auto',
      width: '50%'
    });
    dialogRef.componentInstance.book = added.book;
    dialogRef.componentInstance.added = added;
    dialogRef.afterClosed().subscribe(response => {
      dialogRef = null;
    });
  }

  private remove(id: number): void {
    this.listService.removeAdded(id).subscribe(
      res => this.addeds = this.addeds.filter(obj => obj.id !== res.id)
    );
  }

}
