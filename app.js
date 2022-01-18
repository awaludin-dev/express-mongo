const express = require('express');
const app = express();
const cors = require('cors');
const routerV2 = require('./v2/routes');
const routerV1 = require('./v1/routes')

app.use(cors());
app.use(express.json())

app.use('/api/v1', routerV1);
app.use('/api/v2', routerV2);

app.listen(3001, () => console.log('App berjalan di http://localhost:3001'));