import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('*', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server Running - Listening to port ${process.env.PORT}`);
  }
});
