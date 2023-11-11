// api/pages.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const redis = new Redis(process.env.REDIS_URL!, {
    tls: {
        servername: process.env.REDIS_HOST,
    }});

export interface PageComponent {
  name: string;
  content: string;
  order: string;
}

export interface Page {
  id: string;
  name: string;
  components: PageComponent[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  try {
    switch (method) {
      case 'GET':
        await handleGetRequest(query, res);
        break;

      case 'POST':
        await handlePostRequest(body, res);
        break;

      case 'PUT':
        await handlePutRequest(body, res);
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleGetRequest = async (query: any, res: NextApiResponse) => {
  try {
    const { pageId, projectId } = query;

    if (pageId) {
      // Get a specific page by pageId
      const existingPage = await getExistingPage(pageId);

      if (!_.isEmpty(existingPage)) {
        const components = await getPageComponents(pageId);
        res.status(200).json({ page: { id: pageId, ...existingPage, components } });
      } else {
        res.status(404).json({ message: 'Page not found' });
      }
    }
    else if (projectId) {
      // Get all page ids for a project
      const pipeline = redis.pipeline();
      const pages = await redis.smembers(`${projectId}:pages`);

      pages.forEach((page) => {
          pipeline.hgetall(page);
      })

      const results = await pipeline.exec();
      const response = results?.map((result: any) => ({id: result[1].id, name: result[1].name}))

      res.status(200).json({ pages: response });
    }
  } catch (error) {
    console.error('Error in handleGetRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handlePostRequest = async (body: any, res: NextApiResponse) => {
  try {
    const { projectId, pageName } = body;

    if (!projectId || !pageName) {
      return res.status(400).json({ message: 'Invalid request. Please provide projectId and pageName.' });
    }

    const newPageId = `page_${uuidv4()}`;
    const pageKey = `${projectId}:pages`;
    await redis.sadd(pageKey, newPageId);
    await redis.hset(newPageId, 'id', newPageId);
    await redis.hset(newPageId, 'name', pageName);

    res.status(201).json({ pageId: newPageId });
  } catch (error) {
    console.error('Error in handlePostRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handlePutRequest = async (body: any, res: NextApiResponse) => {
  try {
    const { pageId, pageName, components } = body;

    if (!pageId || !pageName) {
      return res.status(400).json({ message: 'Invalid request. Please provide pageId and newTitle.' });
    }

    const existingPage = await getExistingPage(pageId);

    if (existingPage) {
      await redis.hset(pageId, 'name', pageName);

      // Save components with hierarchy/order
      const componentsWithHierarchy = components.map((component: any, index: any) => {
        const componentId = `component_${uuidv4()}`;
        const componentKey = `${pageId}:components`;

        redis.sadd(componentKey, componentId);
        redis.hset(componentId, 'name', component.name);
        redis.hset(componentId, 'content', component.content);
        redis.hset(componentId, 'order', index.toString()); // Add order information

        return componentId;
      });

      await redis.hset(pageId, 'components', JSON.stringify(componentsWithHierarchy));

      res.status(200).json({ pageId });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    console.error('Error in handlePutRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getExistingPage = async (pageId: string) => {
  try {
    return await redis.hgetall(pageId);
  } catch (error) {
    console.error('Error in getExistingPage:', error);
    throw error;
  }
};

const getPageComponents = async (pageId: string) => {
  try {
    const componentsKey = `${pageId}:components`;
    const componentIds = await redis.smembers(componentsKey);

    return await Promise.all(
      componentIds.map(async (componentId) => {
        const componentData = await redis.hgetall(componentId);
        return { id: componentId, ...componentData };
      })
    );
  } catch (error) {
    console.error('Error in getPageComponents:', error);
    throw error;
  }
};
