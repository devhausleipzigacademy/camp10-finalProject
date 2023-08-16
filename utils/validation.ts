import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodType } from "zod";

type MyRequest<T> = {
  req: NextRequest;
  body: T;
};

type Callback<T> = ({ req, body }: MyRequest<T>) => void;

export const withValidation = <T>(schema: ZodType<T>, cb: Callback<T>) => {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const parsedBody = schema.parse(body);
      return cb({ req, body: parsedBody });
    } catch (err) {
      if (err instanceof ZodError) {
        return NextResponse.json({ message: err.message }, { status: 422 });
      }
      return NextResponse.json({ message: "Something else went wrong when validating data." }, { status: 400 });
    }
  };
};