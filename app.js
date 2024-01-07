const Koa = require('koa');
const fs = require('fs');
const axios = require('axios');
const cors = require('@koa/cors');

let dateStr = '';
const imgMap = {};

const app = new Koa();

app.use(cors()); // 添加跨域支持


app.use(async ctx => {
  const { time, url } = ctx.request.query;

  if (!time && !url) {
    ctx.status = 400;
    ctx.body = 'Missing parameters';
    return;
  }

  if (time) {
    dateStr = time;
    ctx.body = 'set time successfully';
    ctx.status = 200;
    return;
  }

  try {
    const [year, month, date] = dateStr.split('-');
    console.log(year, month, date);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentLength = response.headers['content-length'];
    const filename = `${+month < 10 ? '0' + month : month}-${+date < 10 ? '0' + date : date}`;
    const filePathAndName = `${year}/${filename}`;
    const fileIndex = imgMap[filePathAndName] || 0;
    fs.writeFileSync(`${filePathAndName}${fileIndex > 0 ? '_' + fileIndex : ''}.jpg`, response.data);
    imgMap[filePathAndName] = fileIndex + 1;

    ctx.body = 'Images downloaded successfully';
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = 'Error downloading images';
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// http://localhost:3000/?year=1950&month=1&date=1&urls[]=https://www.kfzimg.com/sw/kfz-cos/kfzimg/8349558/3f0cce0f9d499b64_s.jpg&urls[]=https://www.kfzimg.com/sw/kfzimg/1357/fec58baa4ebaa143_s.jpg
// curl "http://localhost:3000/?year=2023&month=12&date=1&urls[]=https://example.com/image1.jpg&urls[]=https://example.com/image2.jpg"