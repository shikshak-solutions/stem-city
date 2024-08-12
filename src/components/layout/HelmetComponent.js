import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";

export const HelmetComponent = ()=> {
    const location = useLocation();

    const pathname = window.location.pathname;
    const seoMetaData = useSelector((state) => state.webSetting.seoMetaData[pathname]);
    const getHelmetData = (seoMeta, location) => {
        console.log(location, 'loc')
        return seoMeta?.map((data, i) => {
            if (data?.name == 'title') {
                document.title = data?.content;
            } else {
                let seo_html_type = data?.seo_html_type;
                seo_html_type = seo_html_type.replaceAll('data_name', data?.name);
                seo_html_type = seo_html_type.replaceAll('data_content', data?.content);
                const dom = new DOMParser().parseFromString(seo_html_type, 'text/html')

                const el = dom.documentElement.querySelector(':not(html):not(head):not(body)')
                const NodeName = el.nodeName.toLowerCase()

                const attributes = Object.fromEntries([...el.attributes]
                    .map(({name, value}) => [name, value]))

                return <NodeName {...attributes} key={i}/>
            }
        });
    }
    return (<Helmet>{getHelmetData(seoMetaData, location)}</Helmet>)
}