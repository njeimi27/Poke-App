import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokeService } from '../../services/poke.service';

interface PokemonCries {
  Latest: string | null;
  Legacy: string | null;

}
interface TypeColor {
  [key: string]: string;
}

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrl: './pokemon-modal.component.css'
})
export class PokemonModalComponent implements OnInit{
  pokemon: any;
  pokeCries: string[] = [];
  pokeAbilitiesDescription: string[] = [];
  pokeItemsDescription: any[] = [];

  constructor(public dialogRef: MatDialogRef<PokemonModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public pokeservice:PokeService) {
    this.pokemon = data.content;
    console.log("chosen pokemon",this.pokemon);
  }

  ngOnInit(): void {

    this.exportCries();
    this.getAbilities();
    this.getItems();

    console.log("chosen pokemon items",this.pokeItemsDescription);

  

  }


  closeModal(): void {
    this.dialogRef.close();
  }

  exportCries(): void {
    this.pokeCries = (Object.values(this.pokemon.cries) as string[]).filter(url => url !== null);

  }


  getAbilities(){
    for (let i = 0; i < this.pokemon.abilities.length; i++) {
      const ability = this.pokemon.abilities[i];
      this.pokeservice.getAbilitiesData(this.pokemon.abilities[i].ability.name).subscribe((response:any)=>{
        this.pokeAbilitiesDescription.push(response.effect_entries[1].effect);
  
      });
    }
  }

   getItems() {
    for (let i = 0; i < this.pokemon.held_items.length; i++) {
      const ItemUrl = this.pokemon.held_items[i];
       new Promise<void>((resolve, reject) => {
        this.pokeservice.getItemsData(ItemUrl.item.url).subscribe((response: any) => {
          this.pokeItemsDescription.push(response);
          resolve();
        }, error => {
          reject(error);
        });
      });
    }
    for (let i = 0; i < this.pokeItemsDescription.length; i++) {
      console.log("Items Name :", this.pokeItemsDescription[i].name);
      console.log("Item Description :", this.pokeItemsDescription[i].effect_entries[0]);
    }
  }
  

}
