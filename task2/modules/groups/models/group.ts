import { Permission } from './permissions';

export interface Group {
    id: string;
    name: string;
    permissions: Permission[];
}
