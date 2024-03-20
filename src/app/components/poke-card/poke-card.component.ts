import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonModalComponent } from '../pokemon-modal/pokemon-modal.component';
import { PokeService } from '../../services/poke.service';

interface Pokemon {
  stats: {
    base_stat: number;
  }[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
}

interface TypeColor {
  [key: string]: string;
}

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.css'
})
export class PokeCardComponent{

  @Input()
  pokemon!: Pokemon;
  @Input()
   types!: { type: { name: string } }[];

  constructor(private doms : DomSanitizer,private dialog: MatDialog,public pokeservice:PokeService) {}

   card = document.getElementById("card");



showButton(event: any) {
  event.target.querySelector('.hover-button').style.opacity = '1';
}

hideButton(event: any) {
  event.target.querySelector('.hover-button').style.opacity = '0';
}

openModal(pokemon: any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    title: 'Pokemon Details',
    content: pokemon
  };

  // Set the dimensions of the modal
  dialogConfig.width = '50%';
  dialogConfig.height = '90%';

  const dialogRef = this.dialog.open(PokemonModalComponent, dialogConfig);

  // You can also subscribe to the afterClosed() method to get a result when the modal closes
  dialogRef.afterClosed().subscribe(result => {
  });
}


}
