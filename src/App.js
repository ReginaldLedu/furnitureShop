/*В проекте использованы useCallback, useMemo для избежания повторного рендеринга при асинхронных действиях*/

import { Routes, Route } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFurnitureSetLikeMutation,
  useGetDiscountedItemsQuery,
  useFurnitureRemoveLikeMutation,
  getLikesByUser,
} from "./store/rtk";
import { Main } from "./pages/main";
import { Catalogue } from "./pages/catalogue";
import { Basket } from "./pages/basket";
import { Layout } from "./components/layout/layout";
import { Chosen } from "./pages/chosen";
import {
  addItemToTheCart,
  removeGoodFromTheCart,
  removeAllGoodsFromTheCart,
  setChosen,
  removeFromChosen,
} from "./store/slice";

export function App() {
  const user = useSelector(
    (state) => state.rootReducer.furnitureToolkit.currentUser
  );

  const { data } = useGetDiscountedItemsQuery();
  const [discounted, setDiscounted] = useState([]);
  useEffect(() => {
    if (data !== undefined) {
      setDiscounted(data);
    }
  }, [data]);
  const dispatch = useDispatch();
  const [setLikeToTheFurniture] = useCallback(
    useFurnitureSetLikeMutation(),
    []
  );
  const [removeLike] = useFurnitureRemoveLikeMutation();
  const removeFromLiked = useCallback(
    ({ furnitureIdFromUser, userId }, obj) => {
      if (user[0].id.length > 0) {
        removeLike({
          furnitureIdFromUser,
          userId,
        });
        dispatch(removeFromChosen(obj));
      } else {
        dispatch(removeFromChosen(obj));
      }
    }
  );
  const setLike = useCallback(({ furnitureIdFromUser, userId }, obj) => {
    if (user[0].id.length > 0) {
      setLikeToTheFurniture({ furnitureIdFromUser, userId });
      dispatch(setChosen(obj));
    } else {
      dispatch(setChosen(obj));
    }
  });
  const addToTheCart = useCallback((item) => {
    dispatch(addItemToTheCart(item));
  }, []);
  const removeFromTheCart = useCallback((item) => {
    dispatch(removeGoodFromTheCart(item));
  });
  const clearCart = useCallback(() => {
    dispatch(removeAllGoodsFromTheCart());
  });
  useEffect(() => {
    if (user[0].id !== "") {
      dispatch(getLikesByUser(user[0].id));
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/furniture-shop/" element={<Layout />}>
        <Route
          index
          element={
            <Main
              discounted={discounted}
              addToTheCart={addToTheCart}
              setLike={setLike}
              removeFromLiked={removeFromLiked}
            />
          }
        />
        <Route
          path="/catalogue"
          element={
            <Catalogue
              addToTheCart={addToTheCart}
              setLike={setLike}
              removeFromLiked={removeFromLiked}
            />
          }
        />
        <Route
          path="/chosen"
          element={
            <Chosen
              addToTheCart={addToTheCart}
              removeFromLiked={removeFromLiked}
            />
          }
        />
        <Route
          path="/basket"
          element={
            <Basket
              discounted={discounted}
              removeFromTheCart={removeFromTheCart}
              clearCart={clearCart}
              addToTheCart={addToTheCart}
              setLike={setLike}
              removeFromLiked={removeFromLiked}
            />
          }
        />
      </Route>
    </Routes>
  );
}
