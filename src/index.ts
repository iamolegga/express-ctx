import { createNamespace } from "cls-hooked";
import { Request, Response, NextFunction } from "express";

const ctx = createNamespace("express-ctx");

export function middleware(req: Request, res: Response, next: NextFunction) {
  ctx.bindEmitter(req);
  ctx.bindEmitter(res);
  ctx.run(() => next());
}

export function setValue(key: string, value: any) {
  ctx.set(key, value);
}

export function getValue<T = any>(key: string): T | undefined {
  if (ctx && ctx.active) {
    return ctx.get(key);
  }
}
