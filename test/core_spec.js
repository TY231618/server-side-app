import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, next, vote } from '../src/core';

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
    });

    it('puts winner of current vote back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 2
          })
        }),
        entries: List.of('Terminator', 'Borat', 'Lion King')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Terminator', 'Borat')
        }),
        entries: List.of('Lion King', 'Trainspotting')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 4
          })
        }),
        entries: List.of('Terminator', 'Borat', 'Lion King')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Terminator', 'Borat')
        }),
        entries: List.of('Lion King', 'Trainspotting', '28 days later')
      }));
    });

    })

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {

      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')
        }),
        entries: List()
      });

      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to the existing tally for voted entry', () => {

      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 3,
            '28 days later': 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 2
          })
        }),
        entries: List()
      }));
    });
  });

});
