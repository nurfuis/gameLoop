/**
 * Events class for managing event subscriptions and notifications.
 */
class Events {
  /**
   * An array of registered event callbacks.
   * @type {Array<{ id: number, eventName: string, caller: object, callback: Function }>}
   */
  callbacks = [];

  /**
   * Unique identifier counter for event subscriptions.
   * @type {number}
   */
  nextId = 0;

  /**
   * Emits an event to subscribed listeners.
   * @param {string} eventName - Name of the event to trigger.
   * @param {*} value - Optional value to pass to the event listeners.
   */
  emit(eventName, value) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        /**
         * Calls the registered callback function with the provided value for the matching event.
         */
        stored.callback(value);
      }
    });
  }

  /**
   * Subscribes to an event.
   * @param {string} eventName - Name of the event to listen for.
   * @param {object} caller - Object context associated with the subscription (optional).
   * @param {Function} callback - Function to be called when the event is emitted.
   * @returns {number} Unique identifier for the subscription.
   */
  on(eventName, caller, callback) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }

  /**
   * Removes a specific event subscription based on its ID.
   * @param {number} id - Unique identifier of the subscription to remove.
   */
  off(id) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  /**
   * Removes all event subscriptions associated with a specific caller object.
   * @param {object} caller - The object used when subscribing to events.
   */
  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller
    );
  }
}

/**
 * Global instance of the Events class for easy event management.
 */
export const events = new Events();
