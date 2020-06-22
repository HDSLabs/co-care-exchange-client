export interface OrderChangeInput {
  orderId: string;
  userId: string;
  status: string;
  reason: string;
  clientMutationId: string;
  requestId: string;
  shareId: string;
  sharerNotes: string;
  requesterNotes: string;
}
