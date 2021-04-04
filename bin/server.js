const app = require("../src/app");
const db = require("../src/db");
const createFolderIfDoesNotExist = require("../src/helpers/createDir");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

    await createFolderIfDoesNotExist(UPLOAD_DIR);
    await createFolderIfDoesNotExist(AVATARS_OF_USERS);

    console.log(`Server running. Use our API on port ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
});
