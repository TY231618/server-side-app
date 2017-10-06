import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries } from '../src/core';

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
  });
});
