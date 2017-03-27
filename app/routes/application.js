import Ember from 'ember';
import albums from '../models/album-fixtures';

export default Ember.Route.extend({
  model: function() {
    console.log(albums)
    return albums;
  }
});
