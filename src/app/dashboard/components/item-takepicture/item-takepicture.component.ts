import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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

  videoWidth = 0;
  videoHeight = 0;
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 200 },
      height: { ideal: 200 },
    },
  };

  hideVid: boolean = false;
  hidePic: boolean = true;
  showCaptureBtn: boolean = true;
  showRetakeBtn: boolean = false;
  userProfile: UserProfile;

  constructor(private renderer: Renderer2, private userService: UserService) {}

  ngOnInit() {
    this.startCamera();
    this.userProfile = this.userService.getCurrentUserProfile();
    customPrefix.public = 'public/' + this.userProfile.id + '/' + this.agreement.shareId + '/';
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  captureimage() {
    this.hideVid = true;
    this.hidePic = false;
    this.showCaptureBtn = false;
    this.showRetakeBtn = true;
    setTimeout(() => {
      //NOTE: this just needs a moment to show the div
      this.renderer.setProperty(this.canvasElement.nativeElement, 'width', this.videoWidth);
      this.renderer.setProperty(this.canvasElement.nativeElement, 'height', this.videoHeight);
      this.canvasElement.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    }, 500);

    console.log('agreement', this.agreement);
  }

  retakepicture() {
    this.startCamera();
    this.hideVid = false;
    this.hidePic = true;
    this.showCaptureBtn = true;
    this.showRetakeBtn = false;
  }

  acceptimage() {
    console.log('the image', this.canvasElement.nativeElement.toDataURL('image/svg'));

    Storage.put(this.imagename, this.canvasElement.nativeElement.toDataURL('image/svg'), {
      progressCallback(progress) {
        console.log('Uploaded : ', progress);
      },
      contentType: 'image/png',
      customPrefix: customPrefix, // For Customize path
    })
      .then((result: any) => {
        console.log('Success =>', result);
        this.showImageArea = false;
        this.picturetakenEvent.emit(this.showImageArea);
        this.stopCamera();
      })
      .catch((err) => {
        console.log('error =>', err);
      });
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  stopCamera() {
    let videoElem = this.videoElement.nativeElement.srcObject;
    let tracks = videoElem.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });

    videoElem.srcObject = null;
  }
}
