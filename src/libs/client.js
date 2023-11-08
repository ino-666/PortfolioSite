// libs/client.js
import { createClient } from "microcms-js-sdk";

require("dotenv").config();

export const client = createClient({
  serviceDomain: "blog-portfolio",
  apiKey: process.env.API_KEY,
});
