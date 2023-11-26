import { FormatMiddleware } from './format.middleware';
import { ProtectedMiddleware } from './protected.middleware';
import { RemixMiddleware } from './remix.middleware';
import { ReportMiddleware } from './report.middleware';

export const middlewares = [FormatMiddleware, ProtectedMiddleware, RemixMiddleware, ReportMiddleware];
