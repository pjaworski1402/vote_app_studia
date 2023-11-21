'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vote.vote', ({ strapi }) => ({
    async create(ctx) {
      const {
        request: { body },
        state: { user },
      } = ctx;
      // Sprawdź, czy użytkownik już oddał głos
      const existingVote = await strapi.entityService.findMany("api::vote.vote", {
        filters:{
            user: user.id
        }
      });

      // Jeśli użytkownik już oddał głos, zwróć odpowiedni komunikat
      if (existingVote.length>0) {
        ctx.throw(400, 'Głos został już oddany');
        return;
      }

      // Jeśli użytkownik nie oddał jeszcze głosu, dodaj nowy głos
      try {
        const vote = await strapi.entityService.create("api::vote.vote", {
          data: {
            glos: body.data.glos,
            user: user.id,
          },
        });
        return vote;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async find(ctx) {
      const {
        state: { user },
      } = ctx;
      const existingVote = await strapi.entityService.findMany("api::vote.vote", {
        filters:{
            user: user.id
        }
      });
      const allVotes = await strapi.entityService.findMany("api::vote.vote");
      // Jeśli użytkownik już oddał głos, zwróć odpowiedni komunikat
      if (existingVote.length>0) {

        return { message: 'Głos został już oddany',data:existingVote[0],allVotes };
      }

      // Jeśli użytkownik nie oddał jeszcze głosu, zwróć odpowiedni komunikat
      return { message: 'Użytkownik nie oddał jeszcze głosu',allVotes };
    },
}));
