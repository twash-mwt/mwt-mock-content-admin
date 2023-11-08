import { Button as PreviewButton } from 'mwt-components-react';
import { useState } from 'react';
import { contentService } from '../../../helpers/content';
import { NextPageWithLayout } from '../../_app';
import { ContentUpsertRequestBody } from '@/pages/api/content/upsert';

const Page: NextPageWithLayout = () => {
    const [text, setText] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/content/upsert', { method: 'POST', body: JSON.stringify({
            contentKey: 'button',
            contentValues: { text: text }
        } as ContentUpsertRequestBody)})

        if(response.ok) {
            alert('SAVED!')
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return <div>
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="button-text" />
                <button type="submit"></button>
            </form>
        </div>
        <div>
            <PreviewButton>{text}</PreviewButton>
        </div>
    </div>
}
export default Page;