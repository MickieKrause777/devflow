import { FilterQuery } from "mongoose";

import { Tag } from "@/database";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { PaginatedSearchParamsSchema } from "@/lib/validations";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  Tag as TagsType,
} from "@/types/global";

export const getTags = async (
  params: PaginatedSearchParams,
): Promise<ActionResponse<{ tags: TagsType[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = validationResult.params!;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
      status: 200,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
