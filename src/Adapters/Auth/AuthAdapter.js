/*eslint no-unused-vars: "off"*/

/**
 * @interface ParseAuthResponse
 * @property {Boolean} [doNotSave] If true, Parse Server will do not save provided authData.
 * @property {Object} [response] If set, Parse Server will send the provided response to the client under authDataResponse
 * @property {Object} [save] If set, Parse Server will save the object provided into this key, instead of client provided authData
 */

/**
 * AuthPolicy
 * default: can be combined with ONE additional auth provider if additional configured on user
 * additional: could be only used with a default policy auth provider
 * solo: Will ignore ALL additional providers if additional configured on user
 * @typedef {"default" | "additional" | "solo"} AuthPolicy
 */

export class AuthAdapter {
  constructor() {
    /**
     * Usage policy
     * @type {AuthPolicy}
     */
    this.policy = 'default';
  }
  /**
   * @param appIds The specified app IDs in the configuration
   * @param {Object} authData The client provided authData
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {(Promise<undefined|void>|void|undefined)} resolves or returns if the applicationId is valid
   */
  validateAppId(appIds, authData) {
    return Promise.resolve({});
  }

  /**
   * Legacy usage, if provided it will be triggered when authData related to this provider is touched (signup/update/login)
   * otherwise you should implement validateSetup, validateLogin and validateUpdate
   * @param {Object} authData The client provided authData
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {Promise<ParseAuthResponse|void|undefined>}
   */
  validateAuthData(authData, request) {
    return Promise.resolve({});
  }

  /**
   * Triggered when user provide for the first time this auth provider
   * could be a register or the user adding a new auth service
   * @param {Object} authData The client provided authData
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {Promise<ParseAuthResponse|void|undefined>}
   */
  validateSetUp(authData, req) {
    return Promise.resolve({});
  }

  /**
   * Triggered when user provide authData related to this provider
   * The user is not logged in and has already set this provider before
   * @param {Object} authData The client provided authData
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {Promise<ParseAuthResponse|void|undefined>}
   */
  validateLogin(authData, req) {
    return Promise.resolve({});
  }

  /**
   * Triggered when user provide authData related to this provider
   * the user is logged in and has already set this provider before
   * @param {Object} authData The client provided authData
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {Promise<ParseAuthResponse|void|undefined>}
   */
  validateUpdate(authData, req) {
    return Promise.resolve({});
  }

  /**
   * Triggered in pre authentication process if needed (like webauthn, SMS OTP)
   * @param {Object} challengeData Data provided by the client
   * @param {(Object|undefined)} authData Auth data provided by the client, can be used for validation
   * @param {Parse.Cloud.TriggerRequest} request
   * @returns {Promise<Object>} A promise that resolves, resolved value will be added to challenge response under challenge key
   */
  challenge(challengeData, authData, req) {
    return Promise.resolve({});
  }
}

export default AuthAdapter;
