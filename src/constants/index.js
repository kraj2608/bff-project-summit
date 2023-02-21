export const MethodTypes = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const AuthEndPoints = [
  {
    type: "POST",
    url: "/product",
  },
  {
    type: "POST",
    url: "/cart",
  },
  {
    type: "GET",
    url: "/cart/:email",
  },
  {
    type: "DELETE",
    url: "/cart/:id",
  },
];
