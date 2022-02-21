import { ObjectID } from 'mongodb';
import { StorageService } from '../services/storage';
import { BaseModel } from './base';

export interface IDiveAddress {
  _id: ObjectID;
  address: string;
  parent: string;
  loop: number;
  org_id: ObjectID;
  status: number;
  pro_id: ObjectID;
}

export class DiveAddressModel extends BaseModel<IDiveAddress> {
  constructor(storage?: StorageService) {
    super('dive_addresses', storage);
  }
  allowedPaging = [];
  onConnect() {}

  async getDiveAddressOpt(params: { address:string, chain: string; network: string }) {
    const { address, chain, network } = params;
    const addressOpt = await this.collection.findOne({ address });
    return addressOpt;
  }

}

export let DiveAddressStorage = new DiveAddressModel();
