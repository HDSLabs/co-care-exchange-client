import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from 'apollo-client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /**
   * The `Long` scalar type represents non-fractional signed whole 64-bit numeric
   * values. Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;
  /**
   * The `Short` scalar type represents non-fractional signed whole 16-bit numeric
   * values. Short can represent values between -(2^15) and 2^15 - 1.
   */
  Short: any;
  /** The multiplier path scalar represents a valid GraphQL multiplier path string. */
  MultiplierPath: any;
};



export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type ArchiveItemInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  itemId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type AuthorizedOrgEmail = {
  __typename?: 'AuthorizedOrgEmail';
  emailAddress?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  organizationId: Scalars['ID'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CreateAnswerInput = {
  booleanValue?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  numberValue?: Maybe<Scalars['Long']>;
  promptId: Scalars['ID'];
  size?: Maybe<Scalars['String']>;
  textValue?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type CreateAnswerPayload = {
  __typename?: 'CreateAnswerPayload';
  answer?: Maybe<PromptAnswer>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMatchInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['ID']>;
  quantity: Scalars['Int'];
  userId: Scalars['ID'];
};

export type CreateMatchPayload = {
  __typename?: 'CreateMatchPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
};

export type CreateNotePayload = {
  __typename?: 'CreateNotePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  itemRequest?: Maybe<ItemRequest>;
  itemShare?: Maybe<ItemShare>;
  orderNote?: Maybe<OrderNote>;
};

export type CreateOrderNoteInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  itemId: Scalars['ID'];
  noteBody?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  requested?: Maybe<Array<Maybe<DashboardItem>>>;
  shared?: Maybe<Array<Maybe<DashboardItem>>>;
};

export type DashboardItem = {
  __typename?: 'DashboardItem';
  createdOn: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  itemId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  status?: Maybe<Scalars['String']>;
  statusDisplay?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
  userDisplayName?: Maybe<Scalars['String']>;
};

export type DashboardItemDetails = {
  __typename?: 'DashboardItemDetails';
  addressLabel?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  deliveryAddress?: Maybe<Scalars['String']>;
  deliveryCoordinates?: Maybe<Coordinates>;
  details?: Maybe<Scalars['String']>;
  dialogMessage?: Maybe<Scalars['String']>;
  itemId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  orderNotes?: Maybe<Array<Maybe<OrderNote>>>;
  quantity: Scalars['Long'];
  requesterName?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['ID']>;
  shareId?: Maybe<Scalars['ID']>;
  sharerName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  statusDisplay?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
};


export type DistanceInMiles = {
  __typename?: 'DistanceInMiles';
  miles: Scalars['Float'];
};

export type GeoLocationResponsePayload = {
  __typename?: 'GeoLocationResponsePayload';
  metaInfo?: Maybe<ResponseMetaInfo>;
  view?: Maybe<Array<Maybe<SearchResultsView>>>;
};

export type ItemArchivePayload = {
  __typename?: 'ItemArchivePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  itemId: Scalars['ID'];
};

export type ItemRequest = {
  __typename?: 'ItemRequest';
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  count: Scalars['Long'];
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  itemName?: Maybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Array<Maybe<ItemRequestNote>>>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']>;
  organizationId?: Maybe<Scalars['ID']>;
  promptId: Scalars['ID'];
  size?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type ItemRequestNote = {
  __typename?: 'ItemRequestNote';
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  itemRequest?: Maybe<ItemRequest>;
  noteBody?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type ItemShare = {
  __typename?: 'ItemShare';
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  count: Scalars['Long'];
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  itemName?: Maybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Array<Maybe<ItemShareNote>>>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']>;
  organizationId?: Maybe<Scalars['ID']>;
  promptId: Scalars['ID'];
  size?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type ItemShareNote = {
  __typename?: 'ItemShareNote';
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  itemShare?: Maybe<ItemShare>;
  noteBody?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type MatchLocation = {
  __typename?: 'MatchLocation';
  address?: Maybe<Address>;
  locationId?: Maybe<Scalars['String']>;
  locationType?: Maybe<Scalars['String']>;
  navigationPosition?: Maybe<Array<Maybe<NavigationPosition>>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  archiveItem?: Maybe<ItemArchivePayload>;
  createAnswer?: Maybe<CreateAnswerPayload>;
  createMatch?: Maybe<CreateMatchPayload>;
  createOrderNote?: Maybe<CreateNotePayload>;
  saveUser?: Maybe<UserMutationPayload>;
  updateOrder?: Maybe<OrderChangePayload>;
};


export type MutationArchiveItemArgs = {
  input?: Maybe<ArchiveItemInput>;
};


export type MutationCreateAnswerArgs = {
  input?: Maybe<CreateAnswerInput>;
};


export type MutationCreateMatchArgs = {
  input?: Maybe<CreateMatchInput>;
};


export type MutationCreateOrderNoteArgs = {
  input?: Maybe<CreateOrderNoteInput>;
};


export type MutationSaveUserArgs = {
  input?: Maybe<SaveUserInput>;
};


export type MutationUpdateOrderArgs = {
  input?: Maybe<OrderChangeInput>;
};

export type NavigationPosition = {
  __typename?: 'NavigationPosition';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type NearbyUser = {
  __typename?: 'NearbyUser';
  coordinates?: Maybe<Coordinates>;
  distance: Scalars['Float'];
  dropOffRadius: Scalars['Int'];
  emailAddress?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['ID']>;
  pickupRadius: Scalars['Int'];
  userId: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  cancellationReason?: Maybe<Scalars['String']>;
  cancelledBy?: Maybe<Scalars['String']>;
  cancelledOn?: Maybe<Scalars['DateTime']>;
  confirmedOn?: Maybe<Scalars['DateTime']>;
  coveredQuantity: Scalars['Long'];
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  dropOffLatitude?: Maybe<Scalars['Float']>;
  dropOffLongitude?: Maybe<Scalars['Float']>;
  fulfilledOn?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isCancelled: Scalars['Boolean'];
  isConfirmed: Scalars['Boolean'];
  isFulfilled: Scalars['Boolean'];
  isMatched: Scalars['Boolean'];
  itemName?: Maybe<Scalars['String']>;
  itemRequest?: Maybe<ItemRequest>;
  itemRequestId: Scalars['ID'];
  itemShare?: Maybe<ItemShare>;
  itemShareId: Scalars['ID'];
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  orderNotes?: Maybe<Array<Maybe<OrderNote>>>;
  pickupLatitude?: Maybe<Scalars['Float']>;
  pickupLongitude?: Maybe<Scalars['Float']>;
  requestingOrganizationId?: Maybe<Scalars['ID']>;
  requestingUser?: Maybe<User>;
  requestingUserId: Scalars['ID'];
  sharingOrganizationId?: Maybe<Scalars['ID']>;
  sharingUser?: Maybe<User>;
  sharingUserId: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
};

export type OrderChangeInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
  requesterNotes?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['ID']>;
  shareId?: Maybe<Scalars['ID']>;
  sharerNotes?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type OrderChangePayload = {
  __typename?: 'OrderChangePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  orderViewModel?: Maybe<DashboardItemDetails>;
};

export type OrderFilter = {
  AND?: Maybe<Array<OrderFilter>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedBy_contains?: Maybe<Scalars['String']>;
  archivedBy_ends_with?: Maybe<Scalars['String']>;
  archivedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not?: Maybe<Scalars['String']>;
  archivedBy_not_contains?: Maybe<Scalars['String']>;
  archivedBy_not_ends_with?: Maybe<Scalars['String']>;
  archivedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not_starts_with?: Maybe<Scalars['String']>;
  archivedBy_starts_with?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  archivedOn_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_lte?: Maybe<Scalars['DateTime']>;
  archivedOn_not?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_not_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_lte?: Maybe<Scalars['DateTime']>;
  cancellationReason?: Maybe<Scalars['String']>;
  cancellationReason_contains?: Maybe<Scalars['String']>;
  cancellationReason_ends_with?: Maybe<Scalars['String']>;
  cancellationReason_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  cancellationReason_not?: Maybe<Scalars['String']>;
  cancellationReason_not_contains?: Maybe<Scalars['String']>;
  cancellationReason_not_ends_with?: Maybe<Scalars['String']>;
  cancellationReason_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  cancellationReason_not_starts_with?: Maybe<Scalars['String']>;
  cancellationReason_starts_with?: Maybe<Scalars['String']>;
  cancelledBy?: Maybe<Scalars['String']>;
  cancelledBy_contains?: Maybe<Scalars['String']>;
  cancelledBy_ends_with?: Maybe<Scalars['String']>;
  cancelledBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  cancelledBy_not?: Maybe<Scalars['String']>;
  cancelledBy_not_contains?: Maybe<Scalars['String']>;
  cancelledBy_not_ends_with?: Maybe<Scalars['String']>;
  cancelledBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  cancelledBy_not_starts_with?: Maybe<Scalars['String']>;
  cancelledBy_starts_with?: Maybe<Scalars['String']>;
  cancelledOn?: Maybe<Scalars['DateTime']>;
  cancelledOn_gt?: Maybe<Scalars['DateTime']>;
  cancelledOn_gte?: Maybe<Scalars['DateTime']>;
  cancelledOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  cancelledOn_lt?: Maybe<Scalars['DateTime']>;
  cancelledOn_lte?: Maybe<Scalars['DateTime']>;
  cancelledOn_not?: Maybe<Scalars['DateTime']>;
  cancelledOn_not_gt?: Maybe<Scalars['DateTime']>;
  cancelledOn_not_gte?: Maybe<Scalars['DateTime']>;
  cancelledOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  cancelledOn_not_lt?: Maybe<Scalars['DateTime']>;
  cancelledOn_not_lte?: Maybe<Scalars['DateTime']>;
  confirmedOn?: Maybe<Scalars['DateTime']>;
  confirmedOn_gt?: Maybe<Scalars['DateTime']>;
  confirmedOn_gte?: Maybe<Scalars['DateTime']>;
  confirmedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  confirmedOn_lt?: Maybe<Scalars['DateTime']>;
  confirmedOn_lte?: Maybe<Scalars['DateTime']>;
  confirmedOn_not?: Maybe<Scalars['DateTime']>;
  confirmedOn_not_gt?: Maybe<Scalars['DateTime']>;
  confirmedOn_not_gte?: Maybe<Scalars['DateTime']>;
  confirmedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  confirmedOn_not_lt?: Maybe<Scalars['DateTime']>;
  confirmedOn_not_lte?: Maybe<Scalars['DateTime']>;
  coveredQuantity?: Maybe<Scalars['Long']>;
  coveredQuantity_gt?: Maybe<Scalars['Long']>;
  coveredQuantity_gte?: Maybe<Scalars['Long']>;
  coveredQuantity_in?: Maybe<Array<Scalars['Long']>>;
  coveredQuantity_lt?: Maybe<Scalars['Long']>;
  coveredQuantity_lte?: Maybe<Scalars['Long']>;
  coveredQuantity_not?: Maybe<Scalars['Long']>;
  coveredQuantity_not_gt?: Maybe<Scalars['Long']>;
  coveredQuantity_not_gte?: Maybe<Scalars['Long']>;
  coveredQuantity_not_in?: Maybe<Array<Scalars['Long']>>;
  coveredQuantity_not_lt?: Maybe<Scalars['Long']>;
  coveredQuantity_not_lte?: Maybe<Scalars['Long']>;
  createdBy?: Maybe<Scalars['String']>;
  createdBy_contains?: Maybe<Scalars['String']>;
  createdBy_ends_with?: Maybe<Scalars['String']>;
  createdBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not?: Maybe<Scalars['String']>;
  createdBy_not_contains?: Maybe<Scalars['String']>;
  createdBy_not_ends_with?: Maybe<Scalars['String']>;
  createdBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not_starts_with?: Maybe<Scalars['String']>;
  createdBy_starts_with?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  createdOn_gt?: Maybe<Scalars['DateTime']>;
  createdOn_gte?: Maybe<Scalars['DateTime']>;
  createdOn_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_lt?: Maybe<Scalars['DateTime']>;
  createdOn_lte?: Maybe<Scalars['DateTime']>;
  createdOn_not?: Maybe<Scalars['DateTime']>;
  createdOn_not_gt?: Maybe<Scalars['DateTime']>;
  createdOn_not_gte?: Maybe<Scalars['DateTime']>;
  createdOn_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_not_lt?: Maybe<Scalars['DateTime']>;
  createdOn_not_lte?: Maybe<Scalars['DateTime']>;
  dropOffLatitude?: Maybe<Scalars['Float']>;
  dropOffLatitude_gt?: Maybe<Scalars['Float']>;
  dropOffLatitude_gte?: Maybe<Scalars['Float']>;
  dropOffLatitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  dropOffLatitude_lt?: Maybe<Scalars['Float']>;
  dropOffLatitude_lte?: Maybe<Scalars['Float']>;
  dropOffLatitude_not?: Maybe<Scalars['Float']>;
  dropOffLatitude_not_gt?: Maybe<Scalars['Float']>;
  dropOffLatitude_not_gte?: Maybe<Scalars['Float']>;
  dropOffLatitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  dropOffLatitude_not_lt?: Maybe<Scalars['Float']>;
  dropOffLatitude_not_lte?: Maybe<Scalars['Float']>;
  dropOffLongitude?: Maybe<Scalars['Float']>;
  dropOffLongitude_gt?: Maybe<Scalars['Float']>;
  dropOffLongitude_gte?: Maybe<Scalars['Float']>;
  dropOffLongitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  dropOffLongitude_lt?: Maybe<Scalars['Float']>;
  dropOffLongitude_lte?: Maybe<Scalars['Float']>;
  dropOffLongitude_not?: Maybe<Scalars['Float']>;
  dropOffLongitude_not_gt?: Maybe<Scalars['Float']>;
  dropOffLongitude_not_gte?: Maybe<Scalars['Float']>;
  dropOffLongitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  dropOffLongitude_not_lt?: Maybe<Scalars['Float']>;
  dropOffLongitude_not_lte?: Maybe<Scalars['Float']>;
  fulfilledOn?: Maybe<Scalars['DateTime']>;
  fulfilledOn_gt?: Maybe<Scalars['DateTime']>;
  fulfilledOn_gte?: Maybe<Scalars['DateTime']>;
  fulfilledOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  fulfilledOn_lt?: Maybe<Scalars['DateTime']>;
  fulfilledOn_lte?: Maybe<Scalars['DateTime']>;
  fulfilledOn_not?: Maybe<Scalars['DateTime']>;
  fulfilledOn_not_gt?: Maybe<Scalars['DateTime']>;
  fulfilledOn_not_gte?: Maybe<Scalars['DateTime']>;
  fulfilledOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  fulfilledOn_not_lt?: Maybe<Scalars['DateTime']>;
  fulfilledOn_not_lte?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_gt?: Maybe<Scalars['ID']>;
  id_not_gte?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_lt?: Maybe<Scalars['ID']>;
  id_not_lte?: Maybe<Scalars['ID']>;
  isCancelled?: Maybe<Scalars['Boolean']>;
  isCancelled_not?: Maybe<Scalars['Boolean']>;
  isConfirmed?: Maybe<Scalars['Boolean']>;
  isConfirmed_not?: Maybe<Scalars['Boolean']>;
  isFulfilled?: Maybe<Scalars['Boolean']>;
  isFulfilled_not?: Maybe<Scalars['Boolean']>;
  isMatched?: Maybe<Scalars['Boolean']>;
  isMatched_not?: Maybe<Scalars['Boolean']>;
  itemName?: Maybe<Scalars['String']>;
  itemName_contains?: Maybe<Scalars['String']>;
  itemName_ends_with?: Maybe<Scalars['String']>;
  itemName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  itemName_not?: Maybe<Scalars['String']>;
  itemName_not_contains?: Maybe<Scalars['String']>;
  itemName_not_ends_with?: Maybe<Scalars['String']>;
  itemName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  itemName_not_starts_with?: Maybe<Scalars['String']>;
  itemName_starts_with?: Maybe<Scalars['String']>;
  itemRequestId?: Maybe<Scalars['ID']>;
  itemRequestId_gt?: Maybe<Scalars['ID']>;
  itemRequestId_gte?: Maybe<Scalars['ID']>;
  itemRequestId_in?: Maybe<Array<Scalars['ID']>>;
  itemRequestId_lt?: Maybe<Scalars['ID']>;
  itemRequestId_lte?: Maybe<Scalars['ID']>;
  itemRequestId_not?: Maybe<Scalars['ID']>;
  itemRequestId_not_gt?: Maybe<Scalars['ID']>;
  itemRequestId_not_gte?: Maybe<Scalars['ID']>;
  itemRequestId_not_in?: Maybe<Array<Scalars['ID']>>;
  itemRequestId_not_lt?: Maybe<Scalars['ID']>;
  itemRequestId_not_lte?: Maybe<Scalars['ID']>;
  itemShareId?: Maybe<Scalars['ID']>;
  itemShareId_gt?: Maybe<Scalars['ID']>;
  itemShareId_gte?: Maybe<Scalars['ID']>;
  itemShareId_in?: Maybe<Array<Scalars['ID']>>;
  itemShareId_lt?: Maybe<Scalars['ID']>;
  itemShareId_lte?: Maybe<Scalars['ID']>;
  itemShareId_not?: Maybe<Scalars['ID']>;
  itemShareId_not_gt?: Maybe<Scalars['ID']>;
  itemShareId_not_gte?: Maybe<Scalars['ID']>;
  itemShareId_not_in?: Maybe<Array<Scalars['ID']>>;
  itemShareId_not_lt?: Maybe<Scalars['ID']>;
  itemShareId_not_lte?: Maybe<Scalars['ID']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedBy_contains?: Maybe<Scalars['String']>;
  modifiedBy_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not?: Maybe<Scalars['String']>;
  modifiedBy_not_contains?: Maybe<Scalars['String']>;
  modifiedBy_not_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not_starts_with?: Maybe<Scalars['String']>;
  modifiedBy_starts_with?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  modifiedOn_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_lte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_not_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_lte?: Maybe<Scalars['DateTime']>;
  OR?: Maybe<Array<OrderFilter>>;
  pickupLatitude?: Maybe<Scalars['Float']>;
  pickupLatitude_gt?: Maybe<Scalars['Float']>;
  pickupLatitude_gte?: Maybe<Scalars['Float']>;
  pickupLatitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  pickupLatitude_lt?: Maybe<Scalars['Float']>;
  pickupLatitude_lte?: Maybe<Scalars['Float']>;
  pickupLatitude_not?: Maybe<Scalars['Float']>;
  pickupLatitude_not_gt?: Maybe<Scalars['Float']>;
  pickupLatitude_not_gte?: Maybe<Scalars['Float']>;
  pickupLatitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  pickupLatitude_not_lt?: Maybe<Scalars['Float']>;
  pickupLatitude_not_lte?: Maybe<Scalars['Float']>;
  pickupLongitude?: Maybe<Scalars['Float']>;
  pickupLongitude_gt?: Maybe<Scalars['Float']>;
  pickupLongitude_gte?: Maybe<Scalars['Float']>;
  pickupLongitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  pickupLongitude_lt?: Maybe<Scalars['Float']>;
  pickupLongitude_lte?: Maybe<Scalars['Float']>;
  pickupLongitude_not?: Maybe<Scalars['Float']>;
  pickupLongitude_not_gt?: Maybe<Scalars['Float']>;
  pickupLongitude_not_gte?: Maybe<Scalars['Float']>;
  pickupLongitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  pickupLongitude_not_lt?: Maybe<Scalars['Float']>;
  pickupLongitude_not_lte?: Maybe<Scalars['Float']>;
  requestingOrganizationId?: Maybe<Scalars['ID']>;
  requestingOrganizationId_gt?: Maybe<Scalars['ID']>;
  requestingOrganizationId_gte?: Maybe<Scalars['ID']>;
  requestingOrganizationId_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  requestingOrganizationId_lt?: Maybe<Scalars['ID']>;
  requestingOrganizationId_lte?: Maybe<Scalars['ID']>;
  requestingOrganizationId_not?: Maybe<Scalars['ID']>;
  requestingOrganizationId_not_gt?: Maybe<Scalars['ID']>;
  requestingOrganizationId_not_gte?: Maybe<Scalars['ID']>;
  requestingOrganizationId_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  requestingOrganizationId_not_lt?: Maybe<Scalars['ID']>;
  requestingOrganizationId_not_lte?: Maybe<Scalars['ID']>;
  requestingUserId?: Maybe<Scalars['ID']>;
  requestingUserId_gt?: Maybe<Scalars['ID']>;
  requestingUserId_gte?: Maybe<Scalars['ID']>;
  requestingUserId_in?: Maybe<Array<Scalars['ID']>>;
  requestingUserId_lt?: Maybe<Scalars['ID']>;
  requestingUserId_lte?: Maybe<Scalars['ID']>;
  requestingUserId_not?: Maybe<Scalars['ID']>;
  requestingUserId_not_gt?: Maybe<Scalars['ID']>;
  requestingUserId_not_gte?: Maybe<Scalars['ID']>;
  requestingUserId_not_in?: Maybe<Array<Scalars['ID']>>;
  requestingUserId_not_lt?: Maybe<Scalars['ID']>;
  requestingUserId_not_lte?: Maybe<Scalars['ID']>;
  sharingOrganizationId?: Maybe<Scalars['ID']>;
  sharingOrganizationId_gt?: Maybe<Scalars['ID']>;
  sharingOrganizationId_gte?: Maybe<Scalars['ID']>;
  sharingOrganizationId_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  sharingOrganizationId_lt?: Maybe<Scalars['ID']>;
  sharingOrganizationId_lte?: Maybe<Scalars['ID']>;
  sharingOrganizationId_not?: Maybe<Scalars['ID']>;
  sharingOrganizationId_not_gt?: Maybe<Scalars['ID']>;
  sharingOrganizationId_not_gte?: Maybe<Scalars['ID']>;
  sharingOrganizationId_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  sharingOrganizationId_not_lt?: Maybe<Scalars['ID']>;
  sharingOrganizationId_not_lte?: Maybe<Scalars['ID']>;
  sharingUserId?: Maybe<Scalars['ID']>;
  sharingUserId_gt?: Maybe<Scalars['ID']>;
  sharingUserId_gte?: Maybe<Scalars['ID']>;
  sharingUserId_in?: Maybe<Array<Scalars['ID']>>;
  sharingUserId_lt?: Maybe<Scalars['ID']>;
  sharingUserId_lte?: Maybe<Scalars['ID']>;
  sharingUserId_not?: Maybe<Scalars['ID']>;
  sharingUserId_not_gt?: Maybe<Scalars['ID']>;
  sharingUserId_not_gte?: Maybe<Scalars['ID']>;
  sharingUserId_not_in?: Maybe<Array<Scalars['ID']>>;
  sharingUserId_not_lt?: Maybe<Scalars['ID']>;
  sharingUserId_not_lte?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  status_contains?: Maybe<Scalars['String']>;
  status_ends_with?: Maybe<Scalars['String']>;
  status_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  status_not?: Maybe<Scalars['String']>;
  status_not_contains?: Maybe<Scalars['String']>;
  status_not_ends_with?: Maybe<Scalars['String']>;
  status_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  status_not_starts_with?: Maybe<Scalars['String']>;
  status_starts_with?: Maybe<Scalars['String']>;
};

export type OrderNote = {
  __typename?: 'OrderNote';
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  noteBody?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  userId: Scalars['ID'];
};

export type OrderSummary = {
  __typename?: 'OrderSummary';
  cancellationReason?: Maybe<Scalars['String']>;
  cancelledOn?: Maybe<Scalars['DateTime']>;
  createdOn: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  quantity: Scalars['Long'];
  requesterAddress?: Maybe<Scalars['String']>;
  requesterId: Scalars['ID'];
  requesterName?: Maybe<Scalars['String']>;
  requesterOrgId?: Maybe<Scalars['ID']>;
  requestId?: Maybe<Scalars['ID']>;
  shareId?: Maybe<Scalars['ID']>;
  sharerAddress?: Maybe<Scalars['String']>;
  sharerId: Scalars['ID'];
  sharerName?: Maybe<Scalars['String']>;
  sharerOrgId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
};

export type Organization = {
  __typename?: 'Organization';
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  authorizedOrgEmails?: Maybe<Array<Maybe<AuthorizedOrgEmail>>>;
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type OrganizationFilter = {
  AND?: Maybe<Array<OrganizationFilter>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedBy_contains?: Maybe<Scalars['String']>;
  archivedBy_ends_with?: Maybe<Scalars['String']>;
  archivedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not?: Maybe<Scalars['String']>;
  archivedBy_not_contains?: Maybe<Scalars['String']>;
  archivedBy_not_ends_with?: Maybe<Scalars['String']>;
  archivedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not_starts_with?: Maybe<Scalars['String']>;
  archivedBy_starts_with?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  archivedOn_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_lte?: Maybe<Scalars['DateTime']>;
  archivedOn_not?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_not_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_lte?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  createdBy_contains?: Maybe<Scalars['String']>;
  createdBy_ends_with?: Maybe<Scalars['String']>;
  createdBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not?: Maybe<Scalars['String']>;
  createdBy_not_contains?: Maybe<Scalars['String']>;
  createdBy_not_ends_with?: Maybe<Scalars['String']>;
  createdBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not_starts_with?: Maybe<Scalars['String']>;
  createdBy_starts_with?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  createdOn_gt?: Maybe<Scalars['DateTime']>;
  createdOn_gte?: Maybe<Scalars['DateTime']>;
  createdOn_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_lt?: Maybe<Scalars['DateTime']>;
  createdOn_lte?: Maybe<Scalars['DateTime']>;
  createdOn_not?: Maybe<Scalars['DateTime']>;
  createdOn_not_gt?: Maybe<Scalars['DateTime']>;
  createdOn_not_gte?: Maybe<Scalars['DateTime']>;
  createdOn_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_not_lt?: Maybe<Scalars['DateTime']>;
  createdOn_not_lte?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_gt?: Maybe<Scalars['ID']>;
  id_not_gte?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_lt?: Maybe<Scalars['ID']>;
  id_not_lte?: Maybe<Scalars['ID']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedBy_contains?: Maybe<Scalars['String']>;
  modifiedBy_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not?: Maybe<Scalars['String']>;
  modifiedBy_not_contains?: Maybe<Scalars['String']>;
  modifiedBy_not_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not_starts_with?: Maybe<Scalars['String']>;
  modifiedBy_starts_with?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  modifiedOn_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_lte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_not_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_lte?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<OrganizationFilter>>;
};

export type PendingItemRequestSummary = {
  __typename?: 'PendingItemRequestSummary';
  createdOn: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  requesterAddress?: Maybe<Scalars['String']>;
  requesterId: Scalars['ID'];
  requesterName?: Maybe<Scalars['String']>;
  requesterOrganizationId?: Maybe<Scalars['ID']>;
  requestId: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
};

export type PendingItemShareSummary = {
  __typename?: 'PendingItemShareSummary';
  createdOn: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  shareId: Scalars['ID'];
  sharerAddress?: Maybe<Scalars['String']>;
  sharerId: Scalars['ID'];
  sharerName?: Maybe<Scalars['String']>;
  sharerOrganizationId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
};

export type Prompt = {
  __typename?: 'Prompt';
  answers?: Maybe<Array<Maybe<PromptAnswer>>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  audience?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  display?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item?: Maybe<Scalars['String']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  promptType?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
  unitsOfIssue?: Maybe<Scalars['String']>;
};

export type PromptAnswer = {
  __typename?: 'PromptAnswer';
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  booleanValue?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  id: Scalars['ID'];
  item?: Maybe<Scalars['String']>;
  itemRequests?: Maybe<Array<Maybe<ItemRequest>>>;
  itemShares?: Maybe<Array<Maybe<ItemShare>>>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  numberValue?: Maybe<Scalars['Long']>;
  prompt?: Maybe<Prompt>;
  promptId: Scalars['ID'];
  requesterNotes?: Maybe<Scalars['String']>;
  sharerNotes?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  textValue?: Maybe<Scalars['String']>;
  unitOfIssue?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type PromptFilter = {
  AND?: Maybe<Array<PromptFilter>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedBy_contains?: Maybe<Scalars['String']>;
  archivedBy_ends_with?: Maybe<Scalars['String']>;
  archivedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not?: Maybe<Scalars['String']>;
  archivedBy_not_contains?: Maybe<Scalars['String']>;
  archivedBy_not_ends_with?: Maybe<Scalars['String']>;
  archivedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not_starts_with?: Maybe<Scalars['String']>;
  archivedBy_starts_with?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  archivedOn_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_lte?: Maybe<Scalars['DateTime']>;
  archivedOn_not?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_not_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_lte?: Maybe<Scalars['DateTime']>;
  audience?: Maybe<Scalars['String']>;
  audience_contains?: Maybe<Scalars['String']>;
  audience_ends_with?: Maybe<Scalars['String']>;
  audience_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_not?: Maybe<Scalars['String']>;
  audience_not_contains?: Maybe<Scalars['String']>;
  audience_not_ends_with?: Maybe<Scalars['String']>;
  audience_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  audience_not_starts_with?: Maybe<Scalars['String']>;
  audience_starts_with?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdBy_contains?: Maybe<Scalars['String']>;
  createdBy_ends_with?: Maybe<Scalars['String']>;
  createdBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not?: Maybe<Scalars['String']>;
  createdBy_not_contains?: Maybe<Scalars['String']>;
  createdBy_not_ends_with?: Maybe<Scalars['String']>;
  createdBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not_starts_with?: Maybe<Scalars['String']>;
  createdBy_starts_with?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  createdOn_gt?: Maybe<Scalars['DateTime']>;
  createdOn_gte?: Maybe<Scalars['DateTime']>;
  createdOn_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_lt?: Maybe<Scalars['DateTime']>;
  createdOn_lte?: Maybe<Scalars['DateTime']>;
  createdOn_not?: Maybe<Scalars['DateTime']>;
  createdOn_not_gt?: Maybe<Scalars['DateTime']>;
  createdOn_not_gte?: Maybe<Scalars['DateTime']>;
  createdOn_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_not_lt?: Maybe<Scalars['DateTime']>;
  createdOn_not_lte?: Maybe<Scalars['DateTime']>;
  display?: Maybe<Scalars['String']>;
  display_contains?: Maybe<Scalars['String']>;
  display_ends_with?: Maybe<Scalars['String']>;
  display_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  display_not?: Maybe<Scalars['String']>;
  display_not_contains?: Maybe<Scalars['String']>;
  display_not_ends_with?: Maybe<Scalars['String']>;
  display_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  display_not_starts_with?: Maybe<Scalars['String']>;
  display_starts_with?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  groupName_contains?: Maybe<Scalars['String']>;
  groupName_ends_with?: Maybe<Scalars['String']>;
  groupName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  groupName_not?: Maybe<Scalars['String']>;
  groupName_not_contains?: Maybe<Scalars['String']>;
  groupName_not_ends_with?: Maybe<Scalars['String']>;
  groupName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  groupName_not_starts_with?: Maybe<Scalars['String']>;
  groupName_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_gt?: Maybe<Scalars['ID']>;
  id_not_gte?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_lt?: Maybe<Scalars['ID']>;
  id_not_lte?: Maybe<Scalars['ID']>;
  item?: Maybe<Scalars['String']>;
  item_contains?: Maybe<Scalars['String']>;
  item_ends_with?: Maybe<Scalars['String']>;
  item_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  item_not?: Maybe<Scalars['String']>;
  item_not_contains?: Maybe<Scalars['String']>;
  item_not_ends_with?: Maybe<Scalars['String']>;
  item_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  item_not_starts_with?: Maybe<Scalars['String']>;
  item_starts_with?: Maybe<Scalars['String']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedBy_contains?: Maybe<Scalars['String']>;
  modifiedBy_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not?: Maybe<Scalars['String']>;
  modifiedBy_not_contains?: Maybe<Scalars['String']>;
  modifiedBy_not_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not_starts_with?: Maybe<Scalars['String']>;
  modifiedBy_starts_with?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  modifiedOn_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_lte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_not_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_lte?: Maybe<Scalars['DateTime']>;
  OR?: Maybe<Array<PromptFilter>>;
  promptType?: Maybe<Scalars['String']>;
  promptType_contains?: Maybe<Scalars['String']>;
  promptType_ends_with?: Maybe<Scalars['String']>;
  promptType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  promptType_not?: Maybe<Scalars['String']>;
  promptType_not_contains?: Maybe<Scalars['String']>;
  promptType_not_ends_with?: Maybe<Scalars['String']>;
  promptType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  promptType_not_starts_with?: Maybe<Scalars['String']>;
  promptType_starts_with?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
  sizes_contains?: Maybe<Scalars['String']>;
  sizes_ends_with?: Maybe<Scalars['String']>;
  sizes_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sizes_not?: Maybe<Scalars['String']>;
  sizes_not_contains?: Maybe<Scalars['String']>;
  sizes_not_ends_with?: Maybe<Scalars['String']>;
  sizes_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sizes_not_starts_with?: Maybe<Scalars['String']>;
  sizes_starts_with?: Maybe<Scalars['String']>;
  unitsOfIssue?: Maybe<Scalars['String']>;
  unitsOfIssue_contains?: Maybe<Scalars['String']>;
  unitsOfIssue_ends_with?: Maybe<Scalars['String']>;
  unitsOfIssue_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  unitsOfIssue_not?: Maybe<Scalars['String']>;
  unitsOfIssue_not_contains?: Maybe<Scalars['String']>;
  unitsOfIssue_not_ends_with?: Maybe<Scalars['String']>;
  unitsOfIssue_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  unitsOfIssue_not_starts_with?: Maybe<Scalars['String']>;
  unitsOfIssue_starts_with?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated Field no longer supported */
  agreements?: Maybe<Array<Maybe<Order>>>;
  dashboard?: Maybe<Dashboard>;
  geoDistance?: Maybe<DistanceInMiles>;
  geolocation?: Maybe<GeoLocationResponsePayload>;
  itemDetails?: Maybe<DashboardItemDetails>;
  nearbyRequests?: Maybe<Dashboard>;
  nearbyShares?: Maybe<Dashboard>;
  orders?: Maybe<Array<Maybe<Order>>>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  prompts?: Maybe<Array<Maybe<Prompt>>>;
  user?: Maybe<User>;
  userGeoTag?: Maybe<UserGeoTag>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryAgreementsArgs = {
  where?: Maybe<OrderFilter>;
};


export type QueryDashboardArgs = {
  filterOption?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type QueryGeoDistanceArgs = {
  latitude1: Scalars['Float'];
  latitude2: Scalars['Float'];
  longitude1: Scalars['Float'];
  longitude2: Scalars['Float'];
};


export type QueryGeolocationArgs = {
  input?: Maybe<Scalars['String']>;
};


export type QueryItemDetailsArgs = {
  itemId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryNearbyRequestsArgs = {
  filterOption?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type QueryNearbySharesArgs = {
  filterOption?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type QueryOrdersArgs = {
  where?: Maybe<OrderFilter>;
};


export type QueryOrganizationsArgs = {
  where?: Maybe<OrganizationFilter>;
};


export type QueryPromptsArgs = {
  where?: Maybe<PromptFilter>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryUserGeoTagArgs = {
  userId: Scalars['ID'];
};


export type QueryUsersArgs = {
  where?: Maybe<UserFilter>;
};

export type ResponseMetaInfo = {
  __typename?: 'ResponseMetaInfo';
  timestamp: Scalars['DateTime'];
};

export type SaveUserInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  currentUserEmail?: Maybe<Scalars['String']>;
  dropOffRadius: Scalars['Short'];
  emailAddress?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  householdSize?: Maybe<Scalars['Short']>;
  lastName?: Maybe<Scalars['String']>;
  matchRadius: Scalars['Short'];
  organizationId?: Maybe<Scalars['ID']>;
  phoneNumber?: Maybe<Scalars['String']>;
  pickupRadius: Scalars['Short'];
  postalCode?: Maybe<Scalars['String']>;
  sendEmailMatchNotifications: Scalars['Boolean'];
  sendEmailMessageNotifications: Scalars['Boolean'];
  state?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  location?: Maybe<MatchLocation>;
  matchLevel?: Maybe<Scalars['String']>;
  relevance: Scalars['Float'];
};

export type SearchResultsView = {
  __typename?: 'SearchResultsView';
  result?: Maybe<Array<Maybe<SearchResult>>>;
  viewId: Scalars['Int'];
};


export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<PromptAnswer>>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  authenticationProviderId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdOn: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  dropOffRadius: Scalars['Short'];
  emailAddress?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  householdSize?: Maybe<Scalars['Short']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  lastSeenOn?: Maybe<Scalars['DateTime']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  matchRadius: Scalars['Short'];
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  orderSummaries?: Maybe<Array<Maybe<OrderSummary>>>;
  organization?: Maybe<Organization>;
  pendingRequests?: Maybe<Array<Maybe<PendingItemRequestSummary>>>;
  pendingShares?: Maybe<Array<Maybe<PendingItemShareSummary>>>;
  phoneNumber?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  pickupRadius: Scalars['Short'];
  postalCode?: Maybe<Scalars['String']>;
  requestOrders?: Maybe<Array<Maybe<Order>>>;
  requestOrderSummaries?: Maybe<Array<Maybe<OrderSummary>>>;
  sendEmailMatchNotifications: Scalars['Boolean'];
  sendEmailMessageNotifications: Scalars['Boolean'];
  shareOrders?: Maybe<Array<Maybe<Order>>>;
  shareOrderSummaries?: Maybe<Array<Maybe<OrderSummary>>>;
  state?: Maybe<Scalars['String']>;
  toCoordinates?: Maybe<Coordinates>;
};

export type UserFilter = {
  address?: Maybe<Scalars['String']>;
  address_contains?: Maybe<Scalars['String']>;
  address_ends_with?: Maybe<Scalars['String']>;
  address_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  address_not?: Maybe<Scalars['String']>;
  address_not_contains?: Maybe<Scalars['String']>;
  address_not_ends_with?: Maybe<Scalars['String']>;
  address_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  address_not_starts_with?: Maybe<Scalars['String']>;
  address_starts_with?: Maybe<Scalars['String']>;
  AND?: Maybe<Array<UserFilter>>;
  archivedBy?: Maybe<Scalars['String']>;
  archivedBy_contains?: Maybe<Scalars['String']>;
  archivedBy_ends_with?: Maybe<Scalars['String']>;
  archivedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not?: Maybe<Scalars['String']>;
  archivedBy_not_contains?: Maybe<Scalars['String']>;
  archivedBy_not_ends_with?: Maybe<Scalars['String']>;
  archivedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  archivedBy_not_starts_with?: Maybe<Scalars['String']>;
  archivedBy_starts_with?: Maybe<Scalars['String']>;
  archivedOn?: Maybe<Scalars['DateTime']>;
  archivedOn_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_lte?: Maybe<Scalars['DateTime']>;
  archivedOn_not?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_gte?: Maybe<Scalars['DateTime']>;
  archivedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  archivedOn_not_lt?: Maybe<Scalars['DateTime']>;
  archivedOn_not_lte?: Maybe<Scalars['DateTime']>;
  authenticationProviderId?: Maybe<Scalars['String']>;
  authenticationProviderId_contains?: Maybe<Scalars['String']>;
  authenticationProviderId_ends_with?: Maybe<Scalars['String']>;
  authenticationProviderId_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  authenticationProviderId_not?: Maybe<Scalars['String']>;
  authenticationProviderId_not_contains?: Maybe<Scalars['String']>;
  authenticationProviderId_not_ends_with?: Maybe<Scalars['String']>;
  authenticationProviderId_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  authenticationProviderId_not_starts_with?: Maybe<Scalars['String']>;
  authenticationProviderId_starts_with?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  city_contains?: Maybe<Scalars['String']>;
  city_ends_with?: Maybe<Scalars['String']>;
  city_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  city_not?: Maybe<Scalars['String']>;
  city_not_contains?: Maybe<Scalars['String']>;
  city_not_ends_with?: Maybe<Scalars['String']>;
  city_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  city_not_starts_with?: Maybe<Scalars['String']>;
  city_starts_with?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdBy_contains?: Maybe<Scalars['String']>;
  createdBy_ends_with?: Maybe<Scalars['String']>;
  createdBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not?: Maybe<Scalars['String']>;
  createdBy_not_contains?: Maybe<Scalars['String']>;
  createdBy_not_ends_with?: Maybe<Scalars['String']>;
  createdBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdBy_not_starts_with?: Maybe<Scalars['String']>;
  createdBy_starts_with?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['DateTime']>;
  createdOn_gt?: Maybe<Scalars['DateTime']>;
  createdOn_gte?: Maybe<Scalars['DateTime']>;
  createdOn_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_lt?: Maybe<Scalars['DateTime']>;
  createdOn_lte?: Maybe<Scalars['DateTime']>;
  createdOn_not?: Maybe<Scalars['DateTime']>;
  createdOn_not_gt?: Maybe<Scalars['DateTime']>;
  createdOn_not_gte?: Maybe<Scalars['DateTime']>;
  createdOn_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdOn_not_lt?: Maybe<Scalars['DateTime']>;
  createdOn_not_lte?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  displayName_contains?: Maybe<Scalars['String']>;
  displayName_ends_with?: Maybe<Scalars['String']>;
  displayName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  displayName_not?: Maybe<Scalars['String']>;
  displayName_not_contains?: Maybe<Scalars['String']>;
  displayName_not_ends_with?: Maybe<Scalars['String']>;
  displayName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  displayName_not_starts_with?: Maybe<Scalars['String']>;
  displayName_starts_with?: Maybe<Scalars['String']>;
  dropOffRadius?: Maybe<Scalars['Short']>;
  dropOffRadius_gt?: Maybe<Scalars['Short']>;
  dropOffRadius_gte?: Maybe<Scalars['Short']>;
  dropOffRadius_in?: Maybe<Array<Scalars['Short']>>;
  dropOffRadius_lt?: Maybe<Scalars['Short']>;
  dropOffRadius_lte?: Maybe<Scalars['Short']>;
  dropOffRadius_not?: Maybe<Scalars['Short']>;
  dropOffRadius_not_gt?: Maybe<Scalars['Short']>;
  dropOffRadius_not_gte?: Maybe<Scalars['Short']>;
  dropOffRadius_not_in?: Maybe<Array<Scalars['Short']>>;
  dropOffRadius_not_lt?: Maybe<Scalars['Short']>;
  dropOffRadius_not_lte?: Maybe<Scalars['Short']>;
  emailAddress?: Maybe<Scalars['String']>;
  emailAddress_contains?: Maybe<Scalars['String']>;
  emailAddress_ends_with?: Maybe<Scalars['String']>;
  emailAddress_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailAddress_not?: Maybe<Scalars['String']>;
  emailAddress_not_contains?: Maybe<Scalars['String']>;
  emailAddress_not_ends_with?: Maybe<Scalars['String']>;
  emailAddress_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailAddress_not_starts_with?: Maybe<Scalars['String']>;
  emailAddress_starts_with?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  firstName_contains?: Maybe<Scalars['String']>;
  firstName_ends_with?: Maybe<Scalars['String']>;
  firstName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstName_not?: Maybe<Scalars['String']>;
  firstName_not_contains?: Maybe<Scalars['String']>;
  firstName_not_ends_with?: Maybe<Scalars['String']>;
  firstName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstName_not_starts_with?: Maybe<Scalars['String']>;
  firstName_starts_with?: Maybe<Scalars['String']>;
  householdSize?: Maybe<Scalars['Short']>;
  householdSize_gt?: Maybe<Scalars['Short']>;
  householdSize_gte?: Maybe<Scalars['Short']>;
  householdSize_in?: Maybe<Array<Maybe<Scalars['Short']>>>;
  householdSize_lt?: Maybe<Scalars['Short']>;
  householdSize_lte?: Maybe<Scalars['Short']>;
  householdSize_not?: Maybe<Scalars['Short']>;
  householdSize_not_gt?: Maybe<Scalars['Short']>;
  householdSize_not_gte?: Maybe<Scalars['Short']>;
  householdSize_not_in?: Maybe<Array<Maybe<Scalars['Short']>>>;
  householdSize_not_lt?: Maybe<Scalars['Short']>;
  householdSize_not_lte?: Maybe<Scalars['Short']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_gt?: Maybe<Scalars['ID']>;
  id_not_gte?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_lt?: Maybe<Scalars['ID']>;
  id_not_lte?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  lastName_contains?: Maybe<Scalars['String']>;
  lastName_ends_with?: Maybe<Scalars['String']>;
  lastName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastName_not?: Maybe<Scalars['String']>;
  lastName_not_contains?: Maybe<Scalars['String']>;
  lastName_not_ends_with?: Maybe<Scalars['String']>;
  lastName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastName_not_starts_with?: Maybe<Scalars['String']>;
  lastName_starts_with?: Maybe<Scalars['String']>;
  lastSeenOn?: Maybe<Scalars['DateTime']>;
  lastSeenOn_gt?: Maybe<Scalars['DateTime']>;
  lastSeenOn_gte?: Maybe<Scalars['DateTime']>;
  lastSeenOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lastSeenOn_lt?: Maybe<Scalars['DateTime']>;
  lastSeenOn_lte?: Maybe<Scalars['DateTime']>;
  lastSeenOn_not?: Maybe<Scalars['DateTime']>;
  lastSeenOn_not_gt?: Maybe<Scalars['DateTime']>;
  lastSeenOn_not_gte?: Maybe<Scalars['DateTime']>;
  lastSeenOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lastSeenOn_not_lt?: Maybe<Scalars['DateTime']>;
  lastSeenOn_not_lte?: Maybe<Scalars['DateTime']>;
  latitude?: Maybe<Scalars['Float']>;
  latitude_gt?: Maybe<Scalars['Float']>;
  latitude_gte?: Maybe<Scalars['Float']>;
  latitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  latitude_lt?: Maybe<Scalars['Float']>;
  latitude_lte?: Maybe<Scalars['Float']>;
  latitude_not?: Maybe<Scalars['Float']>;
  latitude_not_gt?: Maybe<Scalars['Float']>;
  latitude_not_gte?: Maybe<Scalars['Float']>;
  latitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  latitude_not_lt?: Maybe<Scalars['Float']>;
  latitude_not_lte?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  longitude_gt?: Maybe<Scalars['Float']>;
  longitude_gte?: Maybe<Scalars['Float']>;
  longitude_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  longitude_lt?: Maybe<Scalars['Float']>;
  longitude_lte?: Maybe<Scalars['Float']>;
  longitude_not?: Maybe<Scalars['Float']>;
  longitude_not_gt?: Maybe<Scalars['Float']>;
  longitude_not_gte?: Maybe<Scalars['Float']>;
  longitude_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  longitude_not_lt?: Maybe<Scalars['Float']>;
  longitude_not_lte?: Maybe<Scalars['Float']>;
  matchRadius?: Maybe<Scalars['Short']>;
  matchRadius_gt?: Maybe<Scalars['Short']>;
  matchRadius_gte?: Maybe<Scalars['Short']>;
  matchRadius_in?: Maybe<Array<Scalars['Short']>>;
  matchRadius_lt?: Maybe<Scalars['Short']>;
  matchRadius_lte?: Maybe<Scalars['Short']>;
  matchRadius_not?: Maybe<Scalars['Short']>;
  matchRadius_not_gt?: Maybe<Scalars['Short']>;
  matchRadius_not_gte?: Maybe<Scalars['Short']>;
  matchRadius_not_in?: Maybe<Array<Scalars['Short']>>;
  matchRadius_not_lt?: Maybe<Scalars['Short']>;
  matchRadius_not_lte?: Maybe<Scalars['Short']>;
  modifiedBy?: Maybe<Scalars['String']>;
  modifiedBy_contains?: Maybe<Scalars['String']>;
  modifiedBy_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not?: Maybe<Scalars['String']>;
  modifiedBy_not_contains?: Maybe<Scalars['String']>;
  modifiedBy_not_ends_with?: Maybe<Scalars['String']>;
  modifiedBy_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  modifiedBy_not_starts_with?: Maybe<Scalars['String']>;
  modifiedBy_starts_with?: Maybe<Scalars['String']>;
  modifiedOn?: Maybe<Scalars['DateTime']>;
  modifiedOn_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_lte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_gte?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  modifiedOn_not_lt?: Maybe<Scalars['DateTime']>;
  modifiedOn_not_lte?: Maybe<Scalars['DateTime']>;
  OR?: Maybe<Array<UserFilter>>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumber_contains?: Maybe<Scalars['String']>;
  phoneNumber_ends_with?: Maybe<Scalars['String']>;
  phoneNumber_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  phoneNumber_not?: Maybe<Scalars['String']>;
  phoneNumber_not_contains?: Maybe<Scalars['String']>;
  phoneNumber_not_ends_with?: Maybe<Scalars['String']>;
  phoneNumber_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  phoneNumber_not_starts_with?: Maybe<Scalars['String']>;
  phoneNumber_starts_with?: Maybe<Scalars['String']>;
  pickupRadius?: Maybe<Scalars['Short']>;
  pickupRadius_gt?: Maybe<Scalars['Short']>;
  pickupRadius_gte?: Maybe<Scalars['Short']>;
  pickupRadius_in?: Maybe<Array<Scalars['Short']>>;
  pickupRadius_lt?: Maybe<Scalars['Short']>;
  pickupRadius_lte?: Maybe<Scalars['Short']>;
  pickupRadius_not?: Maybe<Scalars['Short']>;
  pickupRadius_not_gt?: Maybe<Scalars['Short']>;
  pickupRadius_not_gte?: Maybe<Scalars['Short']>;
  pickupRadius_not_in?: Maybe<Array<Scalars['Short']>>;
  pickupRadius_not_lt?: Maybe<Scalars['Short']>;
  pickupRadius_not_lte?: Maybe<Scalars['Short']>;
  postalCode?: Maybe<Scalars['String']>;
  postalCode_contains?: Maybe<Scalars['String']>;
  postalCode_ends_with?: Maybe<Scalars['String']>;
  postalCode_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCode_not?: Maybe<Scalars['String']>;
  postalCode_not_contains?: Maybe<Scalars['String']>;
  postalCode_not_ends_with?: Maybe<Scalars['String']>;
  postalCode_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCode_not_starts_with?: Maybe<Scalars['String']>;
  postalCode_starts_with?: Maybe<Scalars['String']>;
  sendEmailMatchNotifications?: Maybe<Scalars['Boolean']>;
  sendEmailMatchNotifications_not?: Maybe<Scalars['Boolean']>;
  sendEmailMessageNotifications?: Maybe<Scalars['Boolean']>;
  sendEmailMessageNotifications_not?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  state_contains?: Maybe<Scalars['String']>;
  state_ends_with?: Maybe<Scalars['String']>;
  state_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  state_not?: Maybe<Scalars['String']>;
  state_not_contains?: Maybe<Scalars['String']>;
  state_not_ends_with?: Maybe<Scalars['String']>;
  state_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  state_not_starts_with?: Maybe<Scalars['String']>;
  state_starts_with?: Maybe<Scalars['String']>;
};

export type UserGeoTag = {
  __typename?: 'UserGeoTag';
  coordinates?: Maybe<Coordinates>;
  dropOffRadius: Scalars['Int'];
  emailAddress?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['ID']>;
  pickupRadius: Scalars['Int'];
  userId: Scalars['ID'];
  usersWithinDropOffRadius?: Maybe<Array<Maybe<NearbyUser>>>;
  usersWithinPickupRadius?: Maybe<Array<Maybe<NearbyUser>>>;
};

export type UserMutationPayload = {
  __typename?: 'UserMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ArchiveItemMutationVariables = {
  input: ArchiveItemInput;
};


export type ArchiveItemMutation = (
  { __typename?: 'Mutation' }
  & { archiveItem?: Maybe<(
    { __typename?: 'ItemArchivePayload' }
    & Pick<ItemArchivePayload, 'clientMutationId' | 'itemId'>
  )> }
);

export type CreateMatchMutationVariables = {
  input?: Maybe<CreateMatchInput>;
};


export type CreateMatchMutation = (
  { __typename?: 'Mutation' }
  & { createMatch?: Maybe<(
    { __typename?: 'CreateMatchPayload' }
    & Pick<CreateMatchPayload, 'clientMutationId'>
    & { order?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
    )> }
  )> }
);

export type CreateOrderNoteMutationVariables = {
  input: CreateOrderNoteInput;
};


export type CreateOrderNoteMutation = (
  { __typename?: 'Mutation' }
  & { createOrderNote?: Maybe<(
    { __typename?: 'CreateNotePayload' }
    & Pick<CreateNotePayload, 'clientMutationId'>
  )> }
);

export type UpdateOrderMutationVariables = {
  input: OrderChangeInput;
};


export type UpdateOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateOrder?: Maybe<(
    { __typename?: 'OrderChangePayload' }
    & Pick<OrderChangePayload, 'clientMutationId'>
    & { order?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'status'>
    )>, orderViewModel?: Maybe<(
      { __typename?: 'DashboardItemDetails' }
      & Pick<DashboardItemDetails, 'name' | 'status' | 'statusDisplay' | 'orderId' | 'dialogMessage' | 'deliveryAddress' | 'addressLabel' | 'shareId' | 'unitOfIssue' | 'quantity' | 'requestId' | 'details' | 'itemId'>
    )> }
  )> }
);

export type DashboardQueryVariables = {
  userId: Scalars['ID'];
  filterOption?: Maybe<Scalars['String']>;
};


export type DashboardQuery = (
  { __typename?: 'Query' }
  & { dashboard?: Maybe<(
    { __typename?: 'Dashboard' }
    & { requested?: Maybe<Array<Maybe<(
      { __typename?: 'DashboardItem' }
      & Pick<DashboardItem, 'itemId' | 'name' | 'unitOfIssue' | 'quantity' | 'details' | 'statusDisplay' | 'status' | 'userDisplayName' | 'createdOn'>
    )>>>, shared?: Maybe<Array<Maybe<(
      { __typename?: 'DashboardItem' }
      & Pick<DashboardItem, 'itemId' | 'name' | 'unitOfIssue' | 'quantity' | 'details' | 'statusDisplay' | 'status' | 'userDisplayName' | 'createdOn'>
    )>>> }
  )> }
);

export type ItemDetailsQueryVariables = {
  itemId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type ItemDetailsQuery = (
  { __typename?: 'Query' }
  & { itemDetails?: Maybe<(
    { __typename?: 'DashboardItemDetails' }
    & Pick<DashboardItemDetails, 'addressLabel' | 'deliveryAddress' | 'details' | 'dialogMessage' | 'itemId' | 'name' | 'orderId' | 'quantity' | 'requesterName' | 'requestId' | 'shareId' | 'sharerName' | 'status' | 'statusDisplay' | 'unitOfIssue' | 'createdOn'>
    & { orderNotes?: Maybe<Array<Maybe<(
      { __typename?: 'OrderNote' }
      & Pick<OrderNote, 'createdBy' | 'createdOn' | 'id' | 'noteBody' | 'userId' | 'imageUrl'>
    )>>> }
  )> }
);

export type NearbyRequestsQueryVariables = {
  filterOption?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type NearbyRequestsQuery = (
  { __typename?: 'Query' }
  & { nearbyRequests?: Maybe<(
    { __typename?: 'Dashboard' }
    & { requested?: Maybe<Array<Maybe<(
      { __typename?: 'DashboardItem' }
      & Pick<DashboardItem, 'itemId' | 'name' | 'unitOfIssue' | 'quantity' | 'details' | 'statusDisplay' | 'status' | 'userDisplayName' | 'createdOn'>
    )>>> }
  )> }
);

export type NearbySharesQueryVariables = {
  filterOption?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type NearbySharesQuery = (
  { __typename?: 'Query' }
  & { nearbyShares?: Maybe<(
    { __typename?: 'Dashboard' }
    & { shared?: Maybe<Array<Maybe<(
      { __typename?: 'DashboardItem' }
      & Pick<DashboardItem, 'itemId' | 'name' | 'unitOfIssue' | 'quantity' | 'details' | 'statusDisplay' | 'status' | 'userDisplayName' | 'createdOn'>
    )>>> }
  )> }
);

export const ArchiveItemDocument = gql`
    mutation ArchiveItem($input: ArchiveItemInput!) {
  archiveItem(input: $input) {
    clientMutationId
    itemId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ArchiveItemGQL extends Apollo.Mutation<ArchiveItemMutation, ArchiveItemMutationVariables> {
    document = ArchiveItemDocument;
    
  }
export const CreateMatchDocument = gql`
    mutation CreateMatch($input: CreateMatchInput) {
  createMatch(input: $input) {
    clientMutationId
    order {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMatchGQL extends Apollo.Mutation<CreateMatchMutation, CreateMatchMutationVariables> {
    document = CreateMatchDocument;
    
  }
export const CreateOrderNoteDocument = gql`
    mutation CreateOrderNote($input: CreateOrderNoteInput!) {
  createOrderNote(input: $input) {
    clientMutationId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrderNoteGQL extends Apollo.Mutation<CreateOrderNoteMutation, CreateOrderNoteMutationVariables> {
    document = CreateOrderNoteDocument;
    
  }
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($input: OrderChangeInput!) {
  updateOrder(input: $input) {
    clientMutationId
    order {
      id
      status
    }
    orderViewModel {
      name
      status
      statusDisplay
      orderId
      dialogMessage
      deliveryAddress
      addressLabel
      shareId
      unitOfIssue
      quantity
      requestId
      details
      itemId
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOrderGQL extends Apollo.Mutation<UpdateOrderMutation, UpdateOrderMutationVariables> {
    document = UpdateOrderDocument;
    
  }
export const DashboardDocument = gql`
    query Dashboard($userId: ID!, $filterOption: String) {
  dashboard(userId: $userId, filterOption: $filterOption) {
    requested {
      itemId
      name
      unitOfIssue
      quantity
      details
      statusDisplay
      status
      name
      details
      itemId
      userDisplayName
      createdOn
    }
    shared {
      itemId
      name
      unitOfIssue
      quantity
      details
      statusDisplay
      status
      name
      details
      itemId
      userDisplayName
      createdOn
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DashboardGQL extends Apollo.Query<DashboardQuery, DashboardQueryVariables> {
    document = DashboardDocument;
    
  }
export const ItemDetailsDocument = gql`
    query ItemDetails($itemId: ID!, $userId: ID!) {
  itemDetails(itemId: $itemId, userId: $userId) {
    addressLabel
    deliveryAddress
    details
    dialogMessage
    itemId
    name
    orderId
    quantity
    requesterName
    requestId
    shareId
    sharerName
    status
    statusDisplay
    unitOfIssue
    createdOn
    orderNotes {
      createdBy
      createdOn
      id
      noteBody
      userId
      imageUrl
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ItemDetailsGQL extends Apollo.Query<ItemDetailsQuery, ItemDetailsQueryVariables> {
    document = ItemDetailsDocument;
    
  }
export const NearbyRequestsDocument = gql`
    query NearbyRequests($filterOption: String, $userId: ID!) {
  nearbyRequests(filterOption: $filterOption, userId: $userId) {
    requested {
      itemId
      name
      unitOfIssue
      quantity
      details
      statusDisplay
      status
      name
      details
      itemId
      userDisplayName
      createdOn
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NearbyRequestsGQL extends Apollo.Query<NearbyRequestsQuery, NearbyRequestsQueryVariables> {
    document = NearbyRequestsDocument;
    
  }
export const NearbySharesDocument = gql`
    query NearbyShares($filterOption: String, $userId: ID!) {
  nearbyShares(filterOption: $filterOption, userId: $userId) {
    shared {
      itemId
      name
      unitOfIssue
      quantity
      details
      statusDisplay
      status
      name
      details
      itemId
      userDisplayName
      createdOn
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NearbySharesGQL extends Apollo.Query<NearbySharesQuery, NearbySharesQueryVariables> {
    document = NearbySharesDocument;
    
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class CceSDK {
    constructor(
      private archiveItemGql: ArchiveItemGQL,
      private createMatchGql: CreateMatchGQL,
      private createOrderNoteGql: CreateOrderNoteGQL,
      private updateOrderGql: UpdateOrderGQL,
      private dashboardGql: DashboardGQL,
      private itemDetailsGql: ItemDetailsGQL,
      private nearbyRequestsGql: NearbyRequestsGQL,
      private nearbySharesGql: NearbySharesGQL
    ) {}
      
    archiveItem(variables: ArchiveItemMutationVariables, options?: MutationOptionsAlone<ArchiveItemMutation, ArchiveItemMutationVariables>) {
      return this.archiveItemGql.mutate(variables, options)
    }
    
    createMatch(variables?: CreateMatchMutationVariables, options?: MutationOptionsAlone<CreateMatchMutation, CreateMatchMutationVariables>) {
      return this.createMatchGql.mutate(variables, options)
    }
    
    createOrderNote(variables: CreateOrderNoteMutationVariables, options?: MutationOptionsAlone<CreateOrderNoteMutation, CreateOrderNoteMutationVariables>) {
      return this.createOrderNoteGql.mutate(variables, options)
    }
    
    updateOrder(variables: UpdateOrderMutationVariables, options?: MutationOptionsAlone<UpdateOrderMutation, UpdateOrderMutationVariables>) {
      return this.updateOrderGql.mutate(variables, options)
    }
    
    dashboard(variables: DashboardQueryVariables, options?: QueryOptionsAlone<DashboardQueryVariables>) {
      return this.dashboardGql.fetch(variables, options)
    }
    
    dashboardWatch(variables: DashboardQueryVariables, options?: WatchQueryOptionsAlone<DashboardQueryVariables>) {
      return this.dashboardGql.watch(variables, options)
    }
    
    itemDetails(variables: ItemDetailsQueryVariables, options?: QueryOptionsAlone<ItemDetailsQueryVariables>) {
      return this.itemDetailsGql.fetch(variables, options)
    }
    
    itemDetailsWatch(variables: ItemDetailsQueryVariables, options?: WatchQueryOptionsAlone<ItemDetailsQueryVariables>) {
      return this.itemDetailsGql.watch(variables, options)
    }
    
    nearbyRequests(variables: NearbyRequestsQueryVariables, options?: QueryOptionsAlone<NearbyRequestsQueryVariables>) {
      return this.nearbyRequestsGql.fetch(variables, options)
    }
    
    nearbyRequestsWatch(variables: NearbyRequestsQueryVariables, options?: WatchQueryOptionsAlone<NearbyRequestsQueryVariables>) {
      return this.nearbyRequestsGql.watch(variables, options)
    }
    
    nearbyShares(variables: NearbySharesQueryVariables, options?: QueryOptionsAlone<NearbySharesQueryVariables>) {
      return this.nearbySharesGql.fetch(variables, options)
    }
    
    nearbySharesWatch(variables: NearbySharesQueryVariables, options?: WatchQueryOptionsAlone<NearbySharesQueryVariables>) {
      return this.nearbySharesGql.watch(variables, options)
    }
  }