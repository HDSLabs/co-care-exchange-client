export interface SaveUserInput {
  userId?: string;
  address: string;
  emailAddress: string;
  currentUserEmail: string;
  lastName: string;
  firstName: string;
  dropOffRadius: number;
  pickupRadius: number;
  phoneNumber: string;
  postalCode?: string;
  city: string;
  state: string;
  organizationId?: unknown;
  householdSize?: number;
  sendEmailMatchNotifications: boolean;
  matchRadius: number;
  sendEmailMessageNotifications: boolean;
}
