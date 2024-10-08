import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
    errorSources: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
};

export default notFoundRoute;
