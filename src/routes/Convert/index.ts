import express, { Request, Response } from 'express';
import middleware from '../../middlewares';
import path from 'path';
import fs from 'fs';


const convert = express.Router();

convert.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = req.query.width ? parseInt(req.query['width'] as string, 10) : null;
  const height = req.query.height ? parseInt(req.query['height'] as string, 10) : null;

  const numcheck: boolean = /[A-Za-z]/.test(req.query['width'] as string) || /[A-Za-z]/.test(req.query['height'] as string);


  if (filename === undefined || width === undefined || height === undefined) {
    return res.status(400).json({
      message: `Some data is missing - please make sure that you type ?filename=image_name&width=image_width&height=image_height`,
    });
  } else if (filename === null || width === null || height === null) {
    return res.status(400).json({
      message: `Some data is missing - please make sure that you type ?filename=image_name&width=image_width&height=image_height`,
    });
  }else if (!/^[A-Za-z]+$/.test(filename)){
    return res.status(400).json({
      message: `Some data is missing - please make sure that filename dosen't contain numbers`,
    });
  } else if (isNaN(width as number) || isNaN(height as number) || width <= 0 || height <= 0 || numcheck) {
    return res.status(405).json({
      message: `Some data is not match - please make sure that you type width & height as numbers & > 0`,
    });
  } else {
    const fileLocation = path.join(path.resolve('./'), 'assest', `${filename}.jpg`);
    if (fs.existsSync(fileLocation)) {
      const thumbCheck = path.join(path.resolve('./'), 'thumbnail', `${filename}_${width}x${height}.jpg`);
      if (!fs.existsSync(thumbCheck)) {
        const thumb = await middleware(filename, width, height);
        return res.sendFile(thumb);
      } else {
        return res.sendFile(thumbCheck);
      }
    } else {
      return res.status(404).json({ message: 'file is not exists' });
    }
  }
});

export default convert;
