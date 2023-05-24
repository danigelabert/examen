import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  pokemon: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }


  clicar() {
    console.log(this.pokemon)
    const poke=this.pokemon;
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    url += this.pokemon;

    function getPokemonData(pokemon: any) {
      return new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then(response => response.json())
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    // @ts-ignore
    document.getElementById('formulari').addEventListener('submit', function (event) {
      event.preventDefault();
      // @ts-ignore
      const pokemonInput = document.getElementById('input').value.trim().toLowerCase();

      getPokemonData(pokemonInput)
        .then(data => {
          // @ts-ignore
          const isFlyingType = data.types.some(type => type.type.name === 'flying');
          const resultMessage = document.getElementById('resultMessage');
          const resultContainer = document.getElementById('resultContainer');

          if (isFlyingType) {
            // @ts-ignore
            console.log('Promesa resolta! '+poke +' es tipus flying.');
          } else {
            // @ts-ignore
            console.log('Promesa resolta! '+poke +' no es tipus flying.');
          }

          const imageElement = document.createElement('img');
          // @ts-ignore
          imageElement.src = data.sprites.front_default;
          // @ts-ignore
          imageElement.alt = data.name;
          // @ts-ignore
          resultContainer.appendChild(imageElement);

          // @ts-ignore
          resultContainer.style.display = 'block';
        })
        .catch(error => {
          console.log(error)
        });
    });

  }
}
