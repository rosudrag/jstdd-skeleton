/**
 * Event dispatcher module
 * @module  lib/EventDispatcher
 */
//define([], function(undefined) {
module.exports = function(window, $, undefined) {

	'use strict';

	/**
	 * Container for the subscribed topics
	 *
	 * @type {Object}
	 */
	var topics = {};
	/**
	 * Shortcut for the has own property method to aid compression
	 *
	 * @type {function}
	 */
	var hOP    = topics.hasOwnProperty;

	/**
	 * Event dispatcher module used to as a pubsub bus for the project
	 */
	return /** @alias module:lib/EventDispatcher */ {
		/**
		 * Subscription method that allows other modules to subscribe to a topic
		 *
		 * @param  {string}   topic    Name of the topic that is being subscribed to
		 * @param  {function} listener Callback function used when the topic is published to
		 * @return {object}            Object that exposes the remove method to subscribers
		 */
		subscribe: function(topic, listener) {
			// Create the topic's object if not yet created
			if(!hOP.call(topics, topic)) {
				topics[topic] = [];
			}

			// Add the listener to queue
			var index = topics[topic].push(listener) -1;

			// Provide handle back for removal of topic
			return {
				/**
				 * Remove the subscribed topic from the list of topics that can be subscribed to
				 */
				remove: function() {
					delete topics[topic][index];
				}
			};
		},

		/**
		 * Publish a topic to all subscribers
		 *
		 * @param  {string} topic Name of the topic to be published
		 * @param  {object} info  Object containing the data
		 */
		publish: function(topic, info) {
			// If the topic doesn't exist, or there's no listeners in queue, just leave
			if(!hOP.call(topics, topic)) {
				return;
			}

			// Make sure that info has some form of value
			if(typeof info === undefined) {
				info = {};
			}

			// Cycle through topics queue, fire!
			topics[topic].forEach(function(item) {
				item(info);
			});
		}
	};

}(window, jQuery);
