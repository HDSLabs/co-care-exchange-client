import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
export class ItemTakePictureComponent implements OnInit {
  @Input() agreement: Agreement;
  @Input() imagename: string;
  @Input() showImageArea: boolean;

  @Output() picturetakenEvent = new EventEmitter();

  private fileInput: HTMLInputElement;
  @ViewChild('fileInput', { static: false }) set content3(content: HTMLInputElement) {
    if (content) {
      // initially setter gets called with undefined
      this.fileInput = content;
    }
  }

  viewState: 'init' | 'preview' | 'posting' = 'init';
  userProfile: UserProfile;
  imgSrc = '';

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.userProfile = this.userService.getCurrentUserProfile();
    customPrefix.public = 'public/' + this.userProfile.id + '/' + this.agreement.shareId + '/';
  }

  get showUpload() {
    switch (this.viewState) {
      case 'posting':
        return false;
    }
    return true;
  }

  get showPreview() {
    switch (this.viewState) {
      case 'preview':
        return true;
    }
    return false;
  }

  loadpicture({ target }: Event & { target: HTMLInputElement }) {
    this.imgSrc = '';
    const file = target.files[0];
    this.viewState = 'preview';

    const reader = new FileReader();
    reader.onload = e => {
      this.imgSrc = (<FileReader>e.target).result as string;
      this.viewState = 'preview';
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

  get showAccept() {
    switch (this.viewState) {
      case 'preview':
        return true;
    }
    return false;
  }

  acceptimage() {
    this.viewState = 'posting';
    console.log(`the image (${this.imagename}):`, this.imgSrc);

    Storage.put(this.imagename, this.imgSrc, {
      progressCallback(progress: number) {
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
      })
      .catch(err => {
        console.log('error =>', err);
        this.viewState = 'init';
      });
  }
}
