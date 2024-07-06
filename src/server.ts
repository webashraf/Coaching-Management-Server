import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Hey ali !! your server is ready on PORT ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// Promise.reject()
process.on("unhandledRejection", () => {
  console.log(
      "unhandledRejection is deprecated 🤬, The server is suthing down...🤬🤬🤬"
    );
    console.log("server 22222222222", server);
    if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(
    "uncaughtException is deprecated 🤬, The server is suthing down...🤬🤬🤬"
  );
  process.exit(1);
});
