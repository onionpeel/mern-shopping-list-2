const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {mongoURI} = require('./config/keys');
const items = require('./routes/api/items');
const path = require('path');

const app = express();

app.use(bodyParser.json());

mongoose.connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/api/items', items);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html '));
  });

};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
