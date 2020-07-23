import { Agreement } from './agreement';

export interface INearbyItemsListState {
    items: Agreement[];
    orgId?: string;
    filterState: string;
    loading: boolean;
}