import express from 'express';
import {GuestBookData} from '../types';
import guestBookDb from '../guestBookDb';
import {imagesUpload} from '../multer';

const guestBookRouter = express.Router();

guestBookRouter.get('/', async (_, res) => {
  try {
    const guestBooks = await guestBookDb.getItem();
    return res.send(guestBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).send({'Ошибка': 'Не удалось получить массив данных.'});
  }
});

guestBookRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).send({'Ошибка': 'В запросе должно быть указано сообщение.'});
    }

    const guestBookData: GuestBookData = {
      author: req.body.author ? req.body.author : 'Аноним',
      message: req.body.message,
      image: req.file ? req.file.filename : null,
    };

    const saveGuestBook = await guestBookDb.addItem(guestBookData);
    return res.send(saveGuestBook);
  } catch (error) {
    console.error(error);
    return res.status(500).send({'Ошибка': 'Не удалось записать новые данные.'});
  }
});

export default guestBookRouter;