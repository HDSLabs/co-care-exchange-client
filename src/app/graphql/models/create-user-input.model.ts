export interface CreateUserInput {
    address: string;
    emailAddress: string;
    lastName: string;
    firstName: string;
    dropOffRadius: number;
    pickupRadius: number;
    phoneNumber: string;
    postalCode?: string;
    city: string;
    state: string;
    organizationId?: unknown;
    createdBy?: string;
}