import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() Input: string = 'Buscar';
  @Input() button: string = 'Crear';
  @Input() url!: void | string;
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  form:FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        search: ['',Validators.required]
      })
  }

  onSearchChange() {
    const searchText = this.form.get('search')?.value;
    this.searchChange.emit(searchText);
  }

  request() {
    this.router.navigate([this.url])
  }
}

