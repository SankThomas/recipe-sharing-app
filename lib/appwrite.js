import { Client, Databases, Storage } from "appwrite";

export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  database: process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
  recipesCollection: process.env.NEXT_PUBLIC_APPWRITE_RECIPES_COLLECTION,
  imagesBucket: process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET,
};

export const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.project);

export const databases = new Databases(client);
export const storage = new Storage(client);
