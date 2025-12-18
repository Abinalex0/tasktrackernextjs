// // lib/db.ts
// import mongoose from "mongoose";
// const MONGO_URL = process.env.MONGO_URL as string;


// if (!MONGO_URL) {
//   throw new Error("Please define the MONGO_URL environment variable inside .env.local");
// }

// /**
//  * Use a cached connection across hot reloads in development.
//  * This prevents creating multiple connections to the database.
//  */
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       // you can add more mongoose options here if desired
//     };

//     cached.promise = mongoose.connect(MONGO_URL, opts).then((mongooseInstance) => {
//       return mongooseInstance;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }



// lib/db.ts
import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("MONGO_URL environment variable is missing");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
