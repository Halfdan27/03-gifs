import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debounceSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit():void {
    this.debounceSubscription = this.debouncer
    .pipe(debounceTime(300))
    .subscribe( value => this.onDebounce.emit(value) );
  };

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  public emitValue(value: string): void {
    this.debouncer.unsubscribe();
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next (searchTerm);
  }
}
