//import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser, setChosen, clearChosen } from "./slice";

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: fetchBaseQuery({ baseurl: "" }),
  endpoints: (builder) => ({
    getFirstPageOfFurniture: builder.query({
      query: () => `http://localhost:3000/furniture?_page=1&_per_page=5`,
    }),

    getAllFurniture: builder.query({
      query: () => "http://localhost:3000/furniture",
    }),
    getDiscountedItems: builder.query({
      query: () => "http://localhost:3000/furniture?in-sale=true",
    }),
    getAllLikes: builder.query({
      query: () => "http://localhost:3000/likes",
    }),
    getPopularFurniture: builder.query({
      query: () => "http://localhost:3000/furniture?likes_gt=15",
    }),
    getSortedByPrice: builder.query({
      query: () => "http://localhost:3000/furniture?_sort=price",
    }),
    getSortedByLikes: builder.query({
      query: () => "http://localhost:3000/furniture?_sort=likes",
    }),
    getFurnitureByCategory: builder.query({
      query: (category) =>
        `http://localhost:3000/furniture?category=${category}`,
    }),
    getFurnitureByRoom: builder.query({
      query: (room) => `http://localhost:3000/furniture?category=${room}`,
    }),
    furnitureSetLike: builder.mutation({
      query: ({ furnitureIdFromUser, userId }) => ({
        url: "http://localhost:3000/likes",
        method: "POST",
        body: JSON.stringify({ furnitureIdFromUser, userId }),
      }),
    }),

    furnitureRemoveLike: builder.mutation({
      queryFn: async ({ furnitureIdFromUser, userId }) => {
        fetch("http://localhost:3000/likes")
          .then((response) => response.json())
          .then((data) => {
            const forDelete = data.filter(
              (item) =>
                (item.furnitureIdFromUser === furnitureIdFromUser) &
                (item.userId === userId)
            );
            if (forDelete.length > 1) {
              for (let i = 0; i < forDelete.length; i++) {
                fetch(`http://localhost:3000/likes/${forDelete[i].id}`, {
                  method: "DELETE",
                }).then((response) => console.log(response.json()));
              }
            } else {
              fetch(`http://localhost:3000/likes/${forDelete[0].id}`, {
                method: "DELETE",
              }).then((response) => console.log(response.json()));
            }
          });
        /*url: `http://localhost:3000/likes?furnitureIdFromUser=${furnitureIdFromUser}`,
        method: "DELETE",
        body: JSON.stringify({ furnitureIdFromUser, userId }),*/
      },
    }),
    userPostQuery: builder.mutation({
      query: ({ email, password }) => ({
        url: "http://localhost:3000/login",
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    }),
    userPostReg: builder.mutation({
      query: ({ email, password }) => ({
        url: "http://localhost:3000/register",
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    }),

    setNewUser: builder.mutation({
      query: ({ userName, userEmail, userPassword }) => ({
        url: "http://localhost:3000/users",
        method: "POST",
        body: JSON.stringify({
          userName,
          userEmail,
          userPassword,
        }),
      }),
    }),
    getAllUsers: builder.query({
      query: () => "http://localhost:3000/users",
    }),
    getUserByEmail: builder.query({
      query: (userEmail) =>
        `http://localhost:3000/users?userEmail=${userEmail}`,
    }),
    getAllDiscountFurniture: builder.query({
      query: () => "http://localhost:3000/furniture?in-sale=true",
    }),
  }),
});

export const {
  useUserPostRegMutation,
  useUserPostQueryMutation,
  useFurnitureRemoveLikeMutation,
  useGetFirstPageOfFurnitureQuery,
  useGetAllFurnitureQuery,
  useGetPopularFurnitureQuery,
  useGetSortedByPriceQuery,
  useGetSortedByLikesQuery,
  useGetFurnitureByCategoryQuery,
  useGetFurnitureByRoomQuery,
  useFurnitureSetLikeMutation,
  useSetNewUserMutation,
  useGetUserByEmailQuery,
  useGetAllUsersQuery,
  useGetAllDiscountFurnitureQuery,
  useGetDiscountedItemsQuery,
} = furnitureApi;

export const getUserByEmailASYNC = (email) => {
  console.log(email);
  return function (dispatch) {
    fetch(`http://localhost:3000/users?userEmail=${email}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(clearChosen());
        if (json.length > 0) {
          dispatch(setCurrentUser(json));
        } else {
          return null;
        }
      });
  };
};
/*export const getFilteredBySearchWord = (searchWord) => {
  console.log(searchWord);
  return function (dispatch) {
    fetch("http://localhost:3000/furniture")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const filteredRTK = json.filter(
          (item) =>
            item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.description.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.category.toLowerCase().includes(searchWord.toLowerCase())
        );
        dispatch(setFiltered(filteredRTK));
      });
  };
};*/

/*export const getSortedByPriceASYNC = () => {
  return function (dispatch) {
    fetch(`http://localhost:3000/furniture?_sort=price`)
      .then((response) => response.json())
      .then((json) => dispatch(setSorted(json)));
  };
};*/

/*export const getFurnitureByPageASYNC = (pageNumber) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/furniture?_page=${pageNumber}&_per_page=10`)
      .then((response) => response.json())
      .then((json) => dispatch(setSorted(json)));
  };
};*/

export const getLikesByUser = (userId) => {
  return function (dispatch) {
    fetch(`http://localhost:3000/likes?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          fetch(
            `http://localhost:3000/furniture/${json[i].furnitureIdFromUser}`
          )
            .then((response) => response.json())
            .then((json) => dispatch(setChosen(json)));
        }
      });
  };
};
