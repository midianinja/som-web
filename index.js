import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  res.render('index');
});

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Running - Listening to port ${8080}`);
  }
});
