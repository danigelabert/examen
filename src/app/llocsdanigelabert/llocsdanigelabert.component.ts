import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-llocsdanigelabert',
  templateUrl: './llocsdanigelabert.component.html',
  styleUrls: ['./llocsdanigelabert.component.css']
})
export class LlocsdanigelabertComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async promiseprova(): Promise<any> {
    const pokemon =298;
    const promise = new Promise<any>((resolve, reject) => {
      let Observable$=this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`).subscribe({
        next: (data) =>{resolve(data)},
        error: (err) =>{reject(err)}
      })
    });
    return promise;
  }

  async PROVES2() {
    await this.promiseprova().then(
      (val) => {
        console.log(val.location_area.name)
      },
      (err) => {
        console.log(err)
      }
    )
    // console.log(Math.floor((Math.random() + 10)));
  }


}
