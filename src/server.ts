import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

// main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Hey ali !! your server is ready on PORT ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
