import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateSchema =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			next();
		} catch (err: any) {
			return res.sendStatus(400).send(err.errors);
		}
	};

export default validateSchema;
