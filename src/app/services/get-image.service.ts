import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor() { }

  getImageUrl(name: string): string {
    return  `../../assets/images/${name}`;
  }

  getSvgUrl(name: string): string {
    return  `../../assets/svgs/${name}`;
  }

}
