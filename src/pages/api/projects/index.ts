import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const redis = new Redis(process.env.REDIS_URL!, {
    tls: {
        servername: process.env.REDIS_HOST,
    }});

export interface Project {
    id: string;
    name: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const pipeline = redis.pipeline();
        const projects = await redis.smembers('projects');

        projects.forEach((projectId) => {
            pipeline.hgetall(projectId);
        })

        const results = await pipeline.exec();
        const response = results?.map((result: any) => ({id: result[1].id, name: result[1].name}));

        res.status(200).json({ projects:  _.orderBy(response, [x => x.name.toLowerCase()],['asc']) });
    } else if (req.method === 'POST') {
        const { projectName } = req.body;
        const projectId = `project_${uuidv4()}`;
        await redis.sadd('projects', projectId);
        await redis.hset(projectId, 'id', projectId);
        await redis.hset(projectId, 'name', projectName);
        res.status(201).json({ projectId });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
