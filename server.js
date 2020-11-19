require('dotenv').config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || localhost;


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server connected at ${HOSTNAME}:${PORT}/`);
});