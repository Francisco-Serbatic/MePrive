import { Component } from '@angular/core';
import { GetImageService } from 'src/app/services/get-image.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {

  mainImageUrl = this.getImageUrl.getImageUrl('prive04.jpg');
  complementImageUrl = this.getImageUrl.getImageUrl('cofeeWithCroassant.png');

  constructor(private getImageUrl: GetImageService) { }

}
