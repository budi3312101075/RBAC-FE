export interface IRole {
  id: string;
  name: string;
  moduleId: string;
  canRead: number;
  canCreate: number;
  canUpdate: number;
  canDelete: number;
}
