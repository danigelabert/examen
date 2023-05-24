import { Component, OnInit } from '@angular/core';
import { getRandomItem } from 'src/app/helpers/random.helper';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PlayerService } from '../../services/player.service';
import { PokemonService } from '../../services/pokemon.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  loaded: boolean = false;
  private _selected: boolean = false;
  private _pokemonSelected: string = '';
  private _pokemons: Pokemon[] = [];
  private _pokemon!: Pokemon;

  get score(): number {
    return this.playerService.score;
  }

  get hearts(): Array<any> {
    return Array(this.playerService.lifes);
  }

  get selected(): boolean {
    return this._selected;
  }

  get pokemonSelected(): string {
    if (!this.selected) return '';
    return this._pokemonSelected;
  }

  get pokemonList(): Pokemon[] {
    return [...this._pokemons];
  }

  get urlImage(): string {
    return this._pokemon.sprites.other?.dream_world.front_default || '';
  }

  get pokemonName(): string {
    return this._selected ? this._pokemon.name : 'undefined';
  }

  constructor(
    private playerService: PlayerService,
    private pokemonService: PokemonService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.playerService.resetGame();
    this.newGame();
  }

  async promiseprova(seleccio: string): Promise<any> {
    const pokemon = seleccio;
    const promise = new Promise<any>((resolve, reject) => {

      let Observable$ = this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`).subscribe({
        // @ts-ignore
        next: (data) => {
          resolve(data)
        },
        // @ts-ignore
        error: (err) => {
          reject(err)
        }
      })
    });
    return promise;
  }

  ubicacio: []=[];
  async onSelect(pokemonName: string) {
    this._pokemonSelected = pokemonName;
    this._selected = true;

    const seleccio = pokemonName;

    if (pokemonName === this._pokemon.name) {
      this.playerService.increasePoints();

      await this.promiseprova(seleccio)
        .then((val) => {
          for (var i = 0; i < val.length; i++) {
            // @ts-ignore
            this.ubicacio[i] = val[i].location_area.name;
          }
          for (var i = 0; i < val.length; i++) {
            console.log(val[i].location_area.name);
          }
          var ubicacioContainer = document.getElementById("ubicacioContainer");
          // @ts-ignore
          ubicacioContainer.innerHTML = this.ubicacio.map((value) => "<p>" + value + "</p>").join("");
        })
        .catch((err) => {
          console.log(err);
        });
    }


    if (pokemonName !== this._pokemon.name) {
      this.playerService.decreaseLifes();
      console.log('incorrect');
      await this.promiseprova(seleccio)
        .then((val) => {
          for (var i = 0; i < val.length; i++) {
            // @ts-ignore
            this.ubicacio[i] = val[i].location_area.name;
          }
          for (var i = 0; i < val.length; i++) {
            console.log(val[i].location_area.name);
          }
          var ubicacioContainer = document.getElementById("ubicacioContainer");
          // @ts-ignore
          ubicacioContainer.innerHTML = this.ubicacio.map((value) => "<p>" + value + "</p>").join("");
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  // this function es execute every time that user click in next game
  async newGame() {

    this.loaded = false;
    this._selected = false;
    this._pokemons = await this.pokemonService.getRandomPokemons(4).catch(error => {
      console.log('Error: ', error);
      return [];
    });
    if (this._pokemons.length == 0) {
      this.newGame();
    } else {
      this._pokemon = getRandomItem(this._pokemons) || this._pokemons[0];
      console.log(this._pokemons, this._pokemon);
      this.loaded = true;
    }
  }





}
