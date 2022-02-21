import { ObjectID } from 'mongodb';
import { StorageService } from '../services/storage';
import { BaseModel } from './base';

export interface IDiveOrganization {
  _id: ObjectID;
  name: string;
  pro_id: ObjectID;
}

export class DiveOrganizationModel extends BaseModel<IDiveOrganization> {
  constructor(storage?: StorageService) {
    super('dive_orgnazitions', storage);
  }
  allowedPaging = [];
  onConnect() {}

  async getDiveOrganization(params: { org_id: ObjectID, chain: string; network: string }) {
    const { org_id, chain, network } = params;
    const organization = await this.collection.findOne({ _id: org_id });
    return organization;
  }

}

export let DiveOrganizationStorage = new DiveOrganizationModel();
