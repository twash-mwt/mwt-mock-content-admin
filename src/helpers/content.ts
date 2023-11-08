import fs from 'fs';

import * as json from '../data/content.json';

const content = (json as any).default;

const _upsert = (contentKey: string, contentValues: any) => {
    if(!content[contentKey]) {
        content[contentKey] = {};
        content[contentKey].dateCreated = new Date().toISOString();
    }

    content[contentKey].dateUpdated = new Date().toISOString();
    content[contentKey] = { ...content[contentKey], ...contentValues };

    saveData();
}
const _delete = (contentKey: string) => {
    delete content[contentKey];
    saveData();
}

const saveData = () => {
    fs.writeFileSync('/data/content.json', JSON.stringify(content, null, 4));
}

export const contentService = {
    getAll: () => content,
    get: (key: string) => content[key],
    upsert: _upsert,
    delete: _delete
};