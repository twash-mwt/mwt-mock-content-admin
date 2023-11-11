import Sidenav from "@/components/Sidenav";
import { NextPageWithLayout } from "@/pages/_app";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [pages, setPages] = useState([]);
    console.log(slug);

    useEffect(() => {
        if (slug) { getPages(); }
    }, [slug]);

    const getPages = async () => {
        const response =  await fetch(`/api/pages?projectId=${slug}`, { headers: { 'Content-Type': 'application/json' } })
        if(response.ok){
            const json = await response.json();
            setPages(json.pages);
        }
    };
    
    const handleAddNewPage: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pageName = formData.get("pageName");
    
        const response =  await fetch('/api/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({pageName, projectId: slug}) })
    
        if(response.ok){
            const pagesCp = JSON.parse(JSON.stringify(pages));
            pagesCp.push(pageName);
            setPages(pagesCp);
        }
    }

    return <Sidenav navItems={pages} basePath={`${slug}/pages`}>
        <form onSubmit={(e) => handleAddNewPage(e)}>
            <input name="pageName" required></input>
            <button type="submit">Add New Page</button>
        </form>
    </Sidenav>;
}

export default Page;