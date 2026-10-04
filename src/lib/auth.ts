import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db("news-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  trustedOrigins: [
    "https://*.vercel.app", // Vercel-এর সব ব্রাঞ্চ ও প্রিভিউ লিংক সাপোর্ট করবে
    "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true,
  },
});