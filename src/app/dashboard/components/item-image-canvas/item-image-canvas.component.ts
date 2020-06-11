import { OnInit, Renderer2, Component, ElementRef, ViewChild, Input, ApplicationRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-item-image-canvas',
  templateUrl: './item-image-canvas.component.html',
  styleUrls: ['./item-image-canvas.component.scss'],
})
export class ItemImageCanvasComponent implements OnInit {
  @Input() imageUrl: string;

  imgSrc = '';
  viewState: 'init' | 'loading' | 'loaded' | 'error' = 'init';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.viewState = 'loading';
    console.log('getImage', this.imageUrl);

    this.loadPhoto();
  }

  loadPhoto() {
    Storage.get(this.imageUrl, { download: true, level: 'public' })
      .then(res => {
        const image = JSON.parse(JSON.stringify(res))['Body'];
        this.imgSrc = image;
        this.viewState = 'loaded';
      })
      .catch(err => {
        console.log('image canvas error => ', err);
        this.viewState = 'error';
      })
      .finally(() => {
        // for some reason these state updates are outside the "angular zone",
        // so we use the change detector to signify updates.
        // Might be due to ChangeDetectionStrategy.OnPush higher up in the tree.
        this.cd.detectChanges();
      });
  }
}
