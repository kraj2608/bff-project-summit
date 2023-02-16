import HttpStatus from "http-status-codes";
import authClient from "../connectors/authClient";

export default function Authorizer(allowedMethodTypes, roles) {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (allowedMethodTypes.includes(req.method)) {
      next();
      return;
    }

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
  };
}
