import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyEmailService } from '../../../core/services/verify-email-service';
import { MessageDto } from '../../../models/message-dto';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
})
export class ValidateEmailComponent implements OnInit {
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private verifyEmailService: VerifyEmailService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((val) => {
      this.verifyEmailService.verifyEmail(val.token).subscribe(
        (message: MessageDto) => {
          this.message = message.message;
        },
        (error: string) => {
          this.error = error;
        }
      );
    });
  }
}
