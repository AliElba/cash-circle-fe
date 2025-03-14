/* tslint:disable */
/* eslint-disable */
/**
 * CashCircle API
 * API documentation for CashCircle - /api/docs-json
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * Payment status
 * @export
 * @enum {string}
 */

export const PaymentStatus = {
    Pending: 'PENDING',
    Completed: 'COMPLETED',
    Failed: 'FAILED'
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];



