import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const middleware: (imagename: string, width: number | null, height: number | null) => Promise<string> = async (
  imagename: string,
  width: number | null,
  height: number | null,
) => {
  try {
    const input = path.join(path.resolve('./'), 'assest');
    const output = path.join(path.resolve('./'), 'thumbnail', `${imagename}_${width}x${height}.jpg`);
    const imgBuffer = await sharp(path.join(input, `${imagename}.jpg`))
      .resize(width, height,{fit: "fill"})
      .toFormat('jpg')
      .toBuffer();
    if (!fs.existsSync(path.join(path.resolve('./'), 'thumbnail'))) {
      await fs.mkdirSync(path.resolve('./') + `/thumbnail/`);
    }
    fs.writeFileSync(output, imgBuffer);
  } catch (error) {
    console.log(error);
  }

  const newimg = path.join(path.resolve('./'), 'thumbnail', `${imagename}_${width}x${height}.jpg`);

  return newimg;
};

export default middleware;
