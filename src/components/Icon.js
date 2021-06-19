import React from 'react';

/**
 * Fontawesome icon
 * @param {string} name Icon name
 * @returns Component
 */
const Icon = ({name, brandStyle = "fas"}) => <i className={`${brandStyle} fa-${name}`}></i>

export default Icon;
