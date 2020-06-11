export class Agreement {
  orderId: string;
  itemId: string;
  discriminator: string;
  deliveryCoordinates: {
    latitude: number;
    longitude: number;
  };
  deliveryAddress: string;
  cancelledOn: Date;
  cancelledBy: string;
  name: string;
  status: string;
  statusDisplay: string;
  dialogMessage: string;
  statusTypeId: number; // 1=need;2=share
  shareId: string;
  requestId: string;
  unitOfIssue: String;
  details: String;
  addressLabel: String;
  requesterName: string;
  sharerName: string;
  quantity: number;
  orderNotes: IOrderNote[];
  userDisplayName: string;
  rowState: 'rowOpen' | 'rowClosed' | '';
}

export interface IOrderNote {
  createdBy: string;
  createdOn: string;
  id: string;
  noteBody: string;
  userId: string;
  imageUrl: string;
}
