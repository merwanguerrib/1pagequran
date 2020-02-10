import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const PageSchema = new Schema(
  {
    number: Number,
    image: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Page = model("Page", PageSchema);
export default Page;
