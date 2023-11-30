import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class RosterComponent implements OnInit {
  rosterData: any[] = []; // Assuming 'any' type for the data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/roster') // Explicitly declare the expected type
      .subscribe(data => {
        this.rosterData = data;
      }, error => {
        // Handle errors here if needed
        console.error('There was an error fetching the roster data', error);
      });
  }
}