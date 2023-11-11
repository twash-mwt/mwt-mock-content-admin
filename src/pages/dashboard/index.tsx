

import Sidenav from "@/components/Sidenav";
import { NextPageWithLayout } from "@/pages/_app";
import { FormEventHandler, useEffect, useState } from "react";
import { Page, PageComponent } from "../api/pages";
import AvailableComponents from "@/components/AvailableComponents";
import styles from './dashboard.module.scss';
import { Project } from "../api/projects";

const Page: NextPageWithLayout = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pages, setPages] = useState([]);
    const [activeProject, setActiveProject] = useState<Project>();
    const [activePage, setActivePage] = useState<Page>();
    const [showAvailableComponents, setShowAvailableComponents] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        const response =  await fetch('/api/projects', { headers: { 'Content-Type': 'application/json' } })
        if(response.ok){
            const json = await response.json();
            setProjects(json.projects);
        }
    };

    const getPages = async (projectId: string) => {
        const response =  await fetch(`/api/pages?projectId=${projectId}`, { headers: { 'Content-Type': 'application/json' } })
        if(response.ok){
            const json = await response.json();
            setPages(json.pages);
            setActiveProject(projects.find((project) => project.id === projectId));
        }
    };

    const getComponents = async (pageId: string) => {
        const response =  await fetch(`/api/pages?pageId=${pageId}`, { headers: { 'Content-Type': 'application/json' } })
        if(response.ok){
            const json = await response.json();
            setActivePage(json.page);
            setShowAvailableComponents(true);
        }
    };
    
    const handleAddNewProject: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectName = formData.get("projectName");
    
        const response =  await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({projectName}) })
    
        if(response.ok){
            const json = await response.json();
            const pagesCp = JSON.parse(JSON.stringify(projects));
            pagesCp.push({ name: projectName, id: json.projectId });
            setProjects(pagesCp);
        }
    }

    const handleAddNewPage: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pageName = formData.get("pageName");
    
        const response =  await fetch('/api/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({pageName, projectId: activeProject?.id}) })
    
        if(response.ok){
            const pagesCp = JSON.parse(JSON.stringify(pages));
            pagesCp.push(pageName);
            setPages(pagesCp);
        }
    }

    return <div className={styles.container}>
        <Sidenav navItems={projects} onNavItemClick={getPages}>
            <h1>Projects</h1>
            <form className={styles.form} onSubmit={(e) => handleAddNewProject(e)}>
                <input name="projectName" required></input>
                <button type="submit">Add New Project</button>
            </form>
        </Sidenav>
        {
            activeProject && 
            <Sidenav navItems={pages} onNavItemClick={getComponents}>
                <h1>Pages</h1>
                <form className={styles.form} onSubmit={(e) => handleAddNewPage(e)}>
                    <input name="pageName" required></input>
                    <button type="submit">Add New Page</button>
                </form>
            </Sidenav>
        }
        { activePage && <div>
                <div>
                    {/** Some kind of form */}
                </div>
                <div>
                    {/** Some page preview */}
                </div>
                {/** placeholder below to show working */}
                <div>
                    {activePage.components.map((c:PageComponent) => <div>{c.name}</div>)}
                </div>
            </div> }
        { showAvailableComponents && <AvailableComponents /> }
    </div>;
}

export default Page;