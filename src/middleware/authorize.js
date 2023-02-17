import HttpStatus from "http-status-codes";
import authClient from "../connectors/authClient";
import { AuthEndPoints } from "../constants";

export default function Authorizer() {
  return async (req, res, next) => {
    const url = req.url;

    const index = AuthEndPoints.findIndex(
      (item) => item.url === url && item.type === req.method
    );

    if (index === -1) {
      next();
    } else {
      const token = req.headers.authorization;

      if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).send();
      } else {
        try {
          const result = await authClient.get("", token);
          if (result.status === 200 && result.data.status_code === 200) {
            next();
          } else {
            res
              .status(HttpStatus.UNAUTHORIZED)
              .send({ message: "Unauthorized", status_code: 401 });
          }
        } catch (error) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send({ message: "Unauthorized", status_code: 401 });
        }
      }
    }
  };
}
