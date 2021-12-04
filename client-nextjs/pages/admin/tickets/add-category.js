import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import HeadPage from "../../../components/headPage";
import {
  getCategories,
  updateCategories,
} from "../../../app/features/ticket/ticketSlice";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { categories } = useSelector((state) => state.ticket);
  const { _id, isAdmin } = useSelector((state) => state.auth.userLogin);

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

    if (!isAdmin) {
      router.push("/");
    }
  }, [dispatch, isAdmin, router]);

  return (
    <div className="tableContainer">
      <HeadPage title="Add Category" />
      <h1>Add Category</h1>
      <form>
        <div className="searchCategory">
          <label>
            Category{"  "}
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
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
