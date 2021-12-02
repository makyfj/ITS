import { Schema, model, Document } from "mongoose";

interface Category extends Document {
  category: Array<string>;
}

const categorySchema = new Schema<Category>({
  category: { type: [String], required: true },
});

const CategoryModel = model<Category>("Category", categorySchema);

export default CategoryModel;
