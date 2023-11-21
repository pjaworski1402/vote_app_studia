'use strict';

/**
 * is-open router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::is-open.is-open');
