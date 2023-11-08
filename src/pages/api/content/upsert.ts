import type { NextApiRequest, NextApiResponse } from 'next'

import { contentService } from '../../../helpers/content';

export interface ContentUpsertRequestBody {
  contentKey: string;
  contentValues: Record<string, string>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contentBody: ContentUpsertRequestBody = req.body;

  contentService.upsert(contentBody.contentKey, contentBody.contentValues);

  res.status(200);
}