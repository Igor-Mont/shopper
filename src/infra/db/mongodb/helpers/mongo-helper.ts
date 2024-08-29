import { Collection, MongoClient } from 'mongodb';

export const mongoHelper = {
  client: null as MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },
  async disconnect(): Promise<void> {
    this.client = await this.client.close();
  },
  getCollection(name: string): Collection {
    return (this.client as MongoClient).db().collection(name);
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutIdMongo } = collection;
    return collectionWithoutIdMongo;
  },
};
