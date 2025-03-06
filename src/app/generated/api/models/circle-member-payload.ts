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

// May contain unused imports in some cases
// @ts-ignore
import type { UserPayload } from "./user-payload";

/**
 *
 * @export
 * @interface CircleMemberPayload
 */
export interface CircleMemberPayload {
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  circleId: string;
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  userId: string;
  /**
   *
   * @type {number}
   * @memberof CircleMemberPayload
   */
  slotNumber: number;
  /**
   * Payout date for this member
   * @type {string}
   * @memberof CircleMemberPayload
   */
  payoutDate: string;
  /**
   * Administrative fees paid by this member
   * @type {number}
   * @memberof CircleMemberPayload
   */
  adminFees: number;
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  status: CircleMemberPayloadStatusEnum;
  /**
   * Payment status of the member
   * @type {string}
   * @memberof CircleMemberPayload
   */
  paymentStatus: CircleMemberPayloadPaymentStatusEnum;
  /**
   *
   * @type {UserPayload}
   * @memberof CircleMemberPayload
   */
  user: UserPayload;
  /**
   *
   * @type {object}
   * @memberof CircleMemberPayload
   */
  circle: object;
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof CircleMemberPayload
   */
  updatedAt: string;
}

export const CircleMemberPayloadStatusEnum = {
  Pending: "PENDING",
  Confirmed: "CONFIRMED",
  Rejected: "REJECTED",
} as const;

export type CircleMemberPayloadStatusEnum =
  (typeof CircleMemberPayloadStatusEnum)[keyof typeof CircleMemberPayloadStatusEnum];
export const CircleMemberPayloadPaymentStatusEnum = {
  Pending: "PENDING",
  Completed: "COMPLETED",
  Failed: "FAILED",
} as const;

export type CircleMemberPayloadPaymentStatusEnum =
  (typeof CircleMemberPayloadPaymentStatusEnum)[keyof typeof CircleMemberPayloadPaymentStatusEnum];
