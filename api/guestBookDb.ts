import {promises as fs} from 'fs';
import {GuestBookData, GuestBookWithId} from './types';
import {randomUUID} from 'node:crypto';

const fileName = './db.json';
let data: GuestBookWithId[] = [];

const guestBookDb = {
  async init() {
    try {
      const fileContent = await fs.readFile(fileName);
      data = JSON.parse(fileContent.toString());
    } catch (error) {
      console.error(error);
      data = [];
    }
  },
  async getItem() {
    return data;
  },
  async addItem(item: GuestBookData) {
    const id = randomUUID();
    const newItem = {id, ...item};
    data.push(newItem);
    await this.save();
    return newItem;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
};

export default guestBookDb;