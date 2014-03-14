
/**
 * Module dependencies.
 */

var request = require('superagent');
var assert = require('assert');

/**
 * Expose `Event`.
 */

module.exports = Event;

/**
 * Stackdriver events.
 *
 * @param {String} key
 * @return {Event}
 * @api public
 */

function Event(key){
  if (!(this instanceof Event)) return new Event(key);
  assert(key, 'key required');
  this.key = key;
}

/**
 * Submit an annotation for project `key` with `data`.
 *
 * @param {Object|Mixed} data
 * @param {Function} fn
 * @api public
 */

Event.prototype.annotation =
Event.prototype.annotate = function(data, fn){
  if ('object' != typeof data) data = { message: data };
  assert(data, 'data required');
  assert(data.message, '.message required');

  request
  .post('https://event-gateway.stackdriver.com/v1/annotationevent')
  .set('x-stackdriver-apikey', this.key)
  .send(data)
  .end(function(err, body){
    if (err) return fn(err);
    if (body.status >= 300) return fn(body.text);
    fn();
  });
};

/**
 * Submit an deploy event for project `key` with `data`.
 *
 * @param {Object|Mixed} data
 * @param {Function} fn
 * @api public
 */

Event.prototype.deploy = function(data, fn){
  if ('object' != typeof data) data = { revision_id: data };
  assert(data, 'data required');
  assert(data.revision_id, '.revision_id required');

  request
  .post('https://event-gateway.stackdriver.com/v1/deployevent')
  .set('x-stackdriver-apikey', this.key)
  .send(data)
  .end(function(err, body){
    if (err) return fn(err);
    if (body.status >= 300) return fn(body.text);
    fn();
  });
};

