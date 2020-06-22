import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageDto } from '../../models/message-dto';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  private serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) {}

  public verifyEmail(token: string): Observable<MessageDto> {
    return this.http.post<MessageDto>(`${this.serverUrl}validate?token=${token}`, {});
  }
}
