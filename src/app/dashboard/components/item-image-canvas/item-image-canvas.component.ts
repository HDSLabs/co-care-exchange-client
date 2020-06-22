import { OnInit, Renderer2, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-item-image-canvas',
  templateUrl: './item-image-canvas.component.html',
  styleUrls: ['./item-image-canvas.component.scss'],
})
export class ItemImageCanvasComponent implements OnInit {
  @Input() imageUrl: string;
  private canvasElement: ElementRef;
  @ViewChild('canvas', { static: false }) set content(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.canvasElement = content;
    }
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    let self = this;
    console.log('getImage', this.imageUrl);

    Storage.get(this.imageUrl, { download: true, level: 'public' })
      .then((res) => {

        //console.log('success => ', res);

        let image = new Image();

        image.onload = function () {
          self.canvasElement.nativeElement.getContext('2d').drawImage(image, 0, 0);
        };

        image.src = JSON.parse(JSON.stringify(res))['Body'];
      })
      .catch((err) => {
        console.log('error => ', err);
      });
  }
}
