'use strict';

/**
 * is-open service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::is-open.is-open');
