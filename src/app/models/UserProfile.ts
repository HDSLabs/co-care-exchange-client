import { Organization } from './cce/organizations.model';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dropOffRadius: string;
  pickupRadius: string;
  organization: Organization;
}
