import express from 'express';
import convert from './routes';

const app = express();
const port = 3000;


app.use('/convert', convert);


app.use(express());

app.get("/",(req: express.Request,res:express.Response ):void=>{
  res.send(`<h1>welcome to image processing app<h1/>
  <p>/convert?filename={imageName}&width={value}&height={value}</p>`)
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;