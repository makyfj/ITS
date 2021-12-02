import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getCategories,
  updateCategories,
} from "../../../app/features/ticket/ticketSlice";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.ticket);

  // Dummy id to getState for categories
  const tempId = "id";

  const updateCategory = (e) => {
    e.preventDefault();

    let _id;
    categories.forEach((value) => (_id = value._id));

    dispatch(updateCategories({ _id, category }));
  };

  useEffect(() => {
    dispatch(getCategories(tempId));
  }, [dispatch]);

  return (
    <div className="tableContainer">
      <h1>Add Category</h1>
      <form>
        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          onClick={updateCategory}
          disabled={category === "" ? true : false}
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
