import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, next } from '../src/core';

describe('application logic', () => {

  describe('set entries', () => {

    it('adds the entries to the state', () => {

      const state = Map();
      const entries = List.of('Trainspotting', '28 days later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 days later')
      }));
    });

    it('converts to immutable', () => {

      const state = Map();
      const entries = ['Trainspotting', '28 days later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 days later')
      }));

    });
  });


  describe('next', () => {

    it('takes the next two entries under vote', () => {

      const state = Map({
        entries: List.of('Trainspotting', '28 days later', 'Terminator')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')}),
        entries: List.of('Terminator')
      }));
    })

  })
});
