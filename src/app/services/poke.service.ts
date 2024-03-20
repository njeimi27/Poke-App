import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

interface TypeColor {
  [key: string]: string;
}
@Injectable({
  providedIn: 'root'
})
export class PokeService {

  typeColor: TypeColor = {bug: "#26de81",dragon: "#ffeaa7",electric: "#fed330",fairy: "#FF0069",fighting: "#30336b",fire: "#f0932b",flying: "#81ecec",
  grass: "#00b894",ground: "#EFB549",ghost: "#a55eea",ice: "#74b9ff",normal: "#95afc0",poison: "#6c5ce7",psychic: "#a29bfe",rock: "#2d3436",
  water: "#0190FF",
};

  constructor(private http:HttpClient,private doms : DomSanitizer) { }


  //get poke list
  getPokemonsList(limit: number,offset: number){
    console.log("https://pokeapi.co/api/v2/pokemon?limit=$"+limit+"&offset=$"+offset);
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getMoreData(name:string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }

  getAbilitiesData(name:string){
    return this.http.get(`https://pokeapi.co/api/v2/ability/${name}`);

  }

  getItemsData(url:string){
    return this.http.get(`${url}`);
  }

  safeCss( types: { type: { name: string } }[]) {
    return this.doms.bypassSecurityTrustStyle(`background :${this.typeColor[types[0].type.name]}`);
  }

  CardsafeCss(types: { type: { name: string } }[]) {
    return this.doms.bypassSecurityTrustStyle(`background : radial-gradient(circle at 50% 0%, ${this.typeColor[types[0].type.name]} 36%, #ffffff 36%)`);
}
}
