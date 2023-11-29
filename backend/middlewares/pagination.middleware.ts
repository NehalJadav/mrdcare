// deno-lint-ignore-file

import { Context, Status } from "../deps.ts";

export const paginate = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const { request, response } = ctx;

    const page = Number(request.url.searchParams.get("page")) || 1;
    const pageSize = Number(request.url.searchParams.get("pageSize")) || 10;

    const skip = (page - 1) * pageSize;

    ctx.state.pagination = {
      page,
      pageSize,
      skip,
    };

    await next();
  } catch (paginationErrors) {
    throw ({ ...paginationErrors, status: Status.BadRequest });
  }
};
