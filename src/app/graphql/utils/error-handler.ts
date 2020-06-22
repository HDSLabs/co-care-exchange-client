import { throwError } from 'rxjs';

export function handleGQLErrors(data: any) {
  if (data && data.errors) {
    const messages = data.errors.map((e) => e.message).join(', ');
    console.error('A GraphQL error occurred: ', messages);
    return throwError(messages);
  }
  return data.data;
}
