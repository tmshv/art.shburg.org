import React from 'react'

export const Meta = ({ meta }) => (
    <React.Fragment>
        {/* Search Engine */}
        <meta name="description" content={meta.description} />
        <meta name="image" content={meta.image} />

        {/* Schema.org for Google */}
        <meta itemProp="name" content={meta.title} />
        <meta itemProp="description" content={meta.description} />
        <meta itemProp="image" content={meta.image} />

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content={meta.imageWidth} />
        <meta property="og:image:height" content={meta.imageHeight} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:locale" content={meta.locale} />
        <meta property="og:type" content={meta.type} />

        {/* Twitter */}
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image:src" content={meta.image} />
        <meta name="twitter:domain" content={meta.domain} />
        <meta name="twitter:url" content={meta.url} />
        <meta name="twitter:site" content={meta.twitterSite} />
        <meta name="twitter:creator" content={meta.twitterCreator} />
    </React.Fragment>
)