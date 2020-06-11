import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Storage } from 'aws-amplify';
import { Agreement } from '../models/agreement';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/core/services/user.service';

const customPrefix = {
  public: 'private/userid/shareid',
  protected: '{{USER_ID}}/',
  private: '{{USER_ID}}/',
};

@Component({
  selector: 'app-item-takepicture',
  templateUrl: './item-takepicture.component.html',
  styleUrls: ['./item-takepicture.component.scss'],
})
export class ItemTakePictureComponent implements OnInit, OnDestroy {
  @Input() agreement: Agreement;
  @Input() imagename: string;
  @Input() showImageArea: boolean;

  @Output() picturetakenEvent = new EventEmitter();

  private videoElement: ElementRef;
  @ViewChild('video', { static: false }) set content1(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.videoElement = content;
    }
  }

  private canvasElement: ElementRef;
  @ViewChild('canvas', { static: false }) set content2(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.canvasElement = content;
    }
  }

  private fileInput: HTMLInputElement;
  @ViewChild('fileInput', { static: false }) set content3(content: HTMLInputElement) {
    if (content) {
      // initially setter gets called with undefined
      this.fileInput = content;
    }
  }

  videoWidth = 0;
  videoHeight = 0;
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 200 },
      height: { ideal: 200 },
    },
  };

  viewState: 'init' | 'capture' | 'capturePreview' | 'uploadPreview' | 'posting' = 'init';
  userProfile: UserProfile;
  imgSrc = '';

  constructor(private renderer: Renderer2, private userService: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.userProfile = this.userService.getCurrentUserProfile();
    customPrefix.public = 'public/' + this.userProfile.id + '/' + this.agreement.shareId + '/';
    this.startCamera();
    this.viewState = 'capture';
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  get showUpload() {
    switch (this.viewState) {
      case 'posting':
        return false;
    }
    return true;
  }

  loadpicture({ target }: Event & { target: HTMLInputElement }) {
    this.imgSrc = '';
    const file = target.files[0];
    this.viewState = 'uploadPreview';

    const reader = new FileReader();
    reader.onload = e => {
      this.imgSrc = (<FileReader>e.target).result as string;
      this.viewState = 'uploadPreview';
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file); // convert to base64 string
  }

  clearFile() {
    // this covers a tricky edge case where a user:
    // 1. selects a file
    // 2. selects the capture button, clearing the loaded file img src
    // 3. selects the _same_ file
    //
    // in that event, the `onchange` event doesn't fire,
    // so we clear the image file on click
    this.fileInput.value = '';
  }

  get showCapture() {
    switch (this.viewState) {
      case 'init':
      case 'capture':
        return this.canUseCamera;
    }
    return false;
  }
  captureimage() {
    this.renderer.setProperty(this.canvasElement.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvasElement.nativeElement, 'height', this.videoHeight);
    this.canvasElement.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.imgSrc = this.canvasElement.nativeElement.toDataURL('image/svg');
    this.viewState = 'capturePreview';
    console.log('agreement', this.agreement);
  }

  get showRetake() {
    switch (this.viewState) {
      case 'uploadPreview':
      case 'capturePreview':
        return this.canUseCamera;
    }
    return false;
  }
  retakepicture() {
    this.viewState = 'capture';
    this.imgSrc = '';
    this.startCamera();
  }

  get showAccept() {
    switch (this.viewState) {
      case 'capturePreview':
      case 'uploadPreview':
        return true;
    }
    return false;
  }
  acceptimage() {
    this.viewState = 'posting';
    console.log(`the image (${this.imagename}):`, this.imgSrc);

    Storage.put(this.imagename, this.imgSrc, {
      progressCallback(progress) {
        console.log('Uploaded : ', progress);
      },
      contentType: 'image/png',
      customPrefix: customPrefix, // For Customize path
    })
      .then((result: any) => {
        console.log('Success =>', result);
        this.showImageArea = false;
        this.viewState = 'init';
        this.picturetakenEvent.emit(this.showImageArea);
        this.stopCamera();
      })
      .catch(err => {
        console.log('error =>', err);
        this.viewState = 'capture';
      });
  }

  get canUseCamera() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  startCamera() {
    if (this.canUseCamera) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', event => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  stopCamera() {
    const videoElem = this.videoElement.nativeElement.srcObject;
    const tracks = videoElem.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });

    videoElem.srcObject = '';
  }
}
