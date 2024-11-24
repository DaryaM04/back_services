import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { I18nextProvider } from "react-i18next";
import i18n from './i18n';

import UserLayout from './User/Layout.jsx';
import AdminLayout from './Admin/Layout.jsx';
import PublicLayout from './Public/Layout.jsx';
import LandingLayout from "@/Landing/Layout.jsx";


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./${name}.jsx`, import.meta.glob('./**/*.jsx'))).default;
        page.layout = getLayout(name);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

function getLayout(name) {

    let pageName = name;

    if (pageName.startsWith('Public/')) return PublicLayout;
    if (pageName.startsWith('Admin/')) return AdminLayout;
    if (pageName.startsWith('Landing/'))  return LandingLayout;
    if (pageName.startsWith('User/'))  return UserLayout;

    return PublicLayout;
  }
