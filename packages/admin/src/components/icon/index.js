import React from 'react';

export { default as github } from './github.svg?react';
export { default as twitter } from './twitter.svg?react';
export { default as facebook } from './facebook.svg?react';
export { default as weibo } from './weibo.svg?react';
export { default as qq } from './qq.svg?react';
export { default as oidc } from './oidc.svg?react';
export { default as google } from './google.svg?react';
export { default as huawei } from './huawei.svg?react';
export { default as steam } from './steam.svg?react';
import microsoft_consumers from './microsoft-consumers.svg?react';
export { microsoft_consumers };

// Fallback icon for unknown platforms
export const fallback = ({ name }) =>
  React.createElement(
    'span',
    {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#666',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    name ? name.charAt(0).toUpperCase() : '?',
  );
