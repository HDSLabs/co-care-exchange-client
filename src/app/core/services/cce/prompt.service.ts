import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Prompt } from 'src/app/models/cce/prompt';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from './authentication.service';
import { UserProfile } from 'src/app/models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  user: UserProfile;

  constructor(private http: HttpClient, userservice: UserService, authenticationService: AuthenticationService) {
    const userEmail = authenticationService.getEmail();

    userservice.getUser(userEmail).subscribe(user => {
      this.user = user;
    });
  }

  getPrompts(userType: string): any {
    const query = {
      query: `query GetPrompts {
        prompts(where: { audience_contains: "${userType}"}) {
          id, promptType, groupName, item, unitsOfIssue, sizes, display
        }
      }`,
      variables: {},
    };

    return this.http.post<any>(`${environment.serverUrl}`, query);
  }

  savePrompts(prompt: Prompt): any {
    const query = {
      operationName: 'PromptAnswerMutations',
      query: `mutation PromptAnswerMutations($input: CreateAnswerInput!) {
        createAnswer(input: $input) {
          answer {
            id
            promptId
            numberValue
            requesterNotes
            sharerNotes
          },
          clientMutationId
        }
      }`,
      variables: {
        input: {
          promptId: prompt.id,
          userId: this.user.id,
          numberValue: prompt.sharing > 0 ? prompt.sharing : -prompt.requesting,
          unitOfIssue: prompt.unit,
          clientMutationId: '123474',
          size: prompt.size,
          note: prompt.sharing > 0 ? prompt.sharerNotes || null : prompt.requesterNotes || null,
        },
      },
    };

    console.log('query: ', query);

    return this.http.post<any>(`${environment.serverUrl}`, query);
  }
}
