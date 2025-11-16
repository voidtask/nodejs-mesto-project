import { Request } from "express";

const CONTEXT_KEY_IN_REQUEST = "app-context";

// eslint-disable-next-line no-unused-vars
export type RequestContext = { [Key in string]?: Readonly<unknown> };

export const acquireContext = (req: Request): RequestContext | null => {
  // @ts-expect-error - we make sure context key exists on the request
  const context = req?.[CONTEXT_KEY_IN_REQUEST] as unknown;
  if (!context || typeof context !== "object") {
    return null;
  }

  return context as RequestContext;
};

export const getFromContext = <Value = unknown>(
  req: Request,
  key: string
): null | Value => {
  const context = acquireContext(req);
  if (!context) {
    return null;
  }

  const value = context?.[key];
  if (!value) {
    return null;
  }

  return value as Value;
};

export const requireFromContext = <Value = unknown>(
  req: Request,
  key: string
) => {
  const value = getFromContext<Value>(req, key);
  if (!value) {
    throw TypeError(`Required key is not present in context of the request`);
  }

  return value;
};

export const setInContext = (req: Request, key: string, value: unknown) => {
  if (!(CONTEXT_KEY_IN_REQUEST in req)) {
    // @ts-expect-error - we are auhmenting request object, we know that context key might not exist
    req[CONTEXT_KEY_IN_REQUEST] = {};
  }

  // @ts-expect-error - we checked if key is present in request, context should definitely be there
  req[CONTEXT_KEY_IN_REQUEST][key] = value;
};
