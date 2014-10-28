'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('bankFriendsApp'));

  // Test service availability
  it('check the existence of client service', inject(function(client) {
      expect(client).toBeDefined();
    }));
});