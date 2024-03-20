import { PageEvent } from '@angular/material/paginator';
import { PokeService } from './../../services/poke.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent implements OnInit {
  searchQuery: string = '';
  pokemonList: any[] = []; // Assuming you have a list of Pokemon objects
  allPokemonList: any[] = []; // Assuming you have a list of Pokemon objects

  filteredPokemon: any[] = [];
  totalItems=0; 
  pageSize = 10;
  pageIndex = 0;

  constructor(private pokeservice:PokeService){

  }


  ngOnInit(): void {
  this.getData(this.pageIndex);
  this.getAllData(0);

    }

    getData(pageIndex:number){
      this.pokeservice.getPokemonsList(10,pageIndex).subscribe((response:any)=>{
        this.totalItems=response.count;
        response.results.forEach((result:any) => {
          this.pokeservice.getMoreData(result.name).subscribe((element:any)=>{
            this.pokemonList.push(element);
            this.filteredPokemon.push(element);

          });
        });
  
      });
    }

    getAllData(Index:number){
      this.pokeservice.getPokemonsList(2000,Index).subscribe((response:any)=>{
        this.totalItems=response.count;
        response.results.forEach((result:any) => {
          this.pokeservice.getMoreData(result.name).subscribe((element:any)=>{
            this.allPokemonList.push(element);

          });
        });
  
      });
    }

    onPageChange(event: PageEvent) {
      this.pageIndex=event.pageIndex;
      this.getData(this.pageIndex*10);
      this.pokemonList=[];
      this.filteredPokemon=[];
      this.searchQuery="";
     
    }

    filterPokemon() {
      if (this.searchQuery.trim() !== '') {
         this.filteredPokemon = this.allPokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ); 
      } else {
      this.filteredPokemon = this.pokemonList; 
      }
    }
    


}
