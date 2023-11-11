import { Button as PreviewButton } from 'mwt-components-react';
import { useState } from 'react';
import { NextPageWithLayout } from '../../_app';

const Page: NextPageWithLayout = () => {
    const [text, setText] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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