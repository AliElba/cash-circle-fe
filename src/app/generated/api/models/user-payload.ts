/* tslint:disable */
/* eslint-disable */
/**
 * CashCircle API
 * API documentation for CashCircle - http://localhost:3000/api/docs-json
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface UserPayload
 */
export interface UserPayload {
    /**
     * Unique identifier for the user
     * @type {string}
     * @memberof UserPayload
     */
    'id': string;
    /**
     * Phone number of the user
     * @type {string}
     * @memberof UserPayload
     */
    'phone': string;
    /**
     * Name of the user
     * @type {string}
     * @memberof UserPayload
     */
    'name': string;
    /**
     * Date when the user was created
     * @type {string}
     * @memberof UserPayload
     */
    'createdAt': string;
    /**
     * Status of the user
     * @type {string}
     * @memberof UserPayload
     */
    'status': string;
    /**
     * Circles owned by the user
     * @type {object}
     * @memberof UserPayload
     */
    'circlesOwned': object;
    /**
     * Circle memberships of the user
     * @type {Array<object>}
     * @memberof UserPayload
     */
    'circleMemberships': Array<object>;
}

