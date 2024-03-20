import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';
import { PokeService } from '../../services/poke.service';

interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;

  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
      // Add more properties as needed
    };
    home: {
      front_default: string | null;
      front_female: string | null;
    };
    official_artwork: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    // Add more categories as needed
  };
}



@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent implements OnInit, OnDestroy{
  @Input() sprites: PokemonSprites | null = null;
  @Input() types!: { type: { name: string } }[];

  slides: string[] = [];
  currentSlide = 0;
  interval: any;
  color:any;

 constructor(public pokeservice:PokeService){}


  ngOnInit() {
    this.extractUrls();
    this.startSlideShow();

  }
  

  ngOnDestroy(): void {
    this.stopSlideShow();
  }

  startSlideShow(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 6000); // Change slide every 3 seconds (adjust interval as needed)
  }

  stopSlideShow(): void {
    clearInterval(this.interval);
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--; // Decrement currentSlide to go to the previous slide
    } else {
      this.currentSlide = this.slides.length - 1; // Wrap around to the last slide if currently on the first slide
    }
  }
  
  nextSlide(): void {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++; // Increment currentSlide to go to the next slide
    } else {
      this.currentSlide = 0; // Wrap around to the first slide if currently on the last slide
    }
  }

  goToSlide(index:number): void {
    this.currentSlide=index;
 
}
  
  extractUrls() {
    if (this.sprites) {
       const mainProperties: (keyof PokemonSprites)[] = ['front_default', 'front_shiny'];
      for (const property of mainProperties) {
        const url = this.sprites[property];
        if (typeof url === 'string' && url !== null) {
          this.slides.push(url);
        }
      } 
  
      // Extract URLs from nested categories under 'other'
      const other = this.sprites.other;
      if (other) {
        const categories = Object.entries(other);
        for (const [categoryName, category] of categories) {
          // Exclude 'showdown' category
          if (categoryName !== 'showdown') {
            const urls = Object.values(category);
            for (const url of urls) {
              if (typeof url === 'string' && url !== null) {
                this.slides.push(url);
              }
            }
          }
        }
        const showdown = this.sprites.other.showdown;
        if (showdown) {
          const showdownUrls: (keyof typeof showdown)[] = ['front_default', 'front_female', 'front_shiny', 'front_shiny_female'];
          for (const property of showdownUrls) {
            const url = showdown[property];
            if (typeof url === 'string' && url !== null) {
              this.slides.push(url);
            }
          }
        } 

      }
    }
  }
  

}
