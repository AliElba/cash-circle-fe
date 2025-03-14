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

import type { Configuration } from "../configuration";
import type { AxiosInstance, AxiosPromise, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
    assertParamExists,
    createRequestFunction,
    DUMMY_BASE_URL,
    serializeDataIfNeeded,
    setApiKeyToObject,
    setBasicAuthToObject,
    setBearerAuthToObject,
    setOAuthToObject,
    setSearchParams,
    toPathString
} from "../common";
// @ts-ignore
import { BASE_PATH, BaseAPI, COLLECTION_FORMATS, operationServerMap, type RequestArgs, RequiredError } from "../base";
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
import type { CircleMemberPayload, CirclePayload, CreateCircleDto, MemberDto, UpdateCircleDto } from "../models";

/**
 * CirclesApi - axios parameter creator
 * @export
 */
export const CirclesApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {string} id
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addMember: async (id: string, memberDto: MemberDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("addMember", "id", id);
      // verify required parameter 'memberDto' is not null or undefined
      assertParamExists("addMember", "memberDto", memberDto);
      const localVarPath = `/circles/{id}/members`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(memberDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {CreateCircleDto} createCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    create: async (createCircleDto: CreateCircleDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'createCircleDto' is not null or undefined
      assertParamExists("create", "createCircleDto", createCircleDto);
      const localVarPath = `/circles`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(createCircleDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findAll: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/circles`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {FindAllUserCirclesStatusEnum} [status]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findAllUserCircles: async (
      status?: FindAllUserCirclesStatusEnum,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/circles/mine`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (status !== undefined) {
        localVarQueryParameter["status"] = status;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findOne: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("findOne", "id", id);
      const localVarPath = `/circles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    remove: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("remove", "id", id);
      const localVarPath = `/circles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} circleId
     * @param {string} memberId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeMember: async (
      circleId: string,
      memberId: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'circleId' is not null or undefined
      assertParamExists("removeMember", "circleId", circleId);
      // verify required parameter 'memberId' is not null or undefined
      assertParamExists("removeMember", "memberId", memberId);
      const localVarPath = `/circles/{circleId}/members/{memberId}`
        .replace(`{${"circleId"}}`, encodeURIComponent(String(circleId)))
        .replace(`{${"memberId"}}`, encodeURIComponent(String(memberId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} id
     * @param {UpdateCircleDto} updateCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    update: async (
      id: string,
      updateCircleDto: UpdateCircleDto,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("update", "id", id);
      // verify required parameter 'updateCircleDto' is not null or undefined
      assertParamExists("update", "updateCircleDto", updateCircleDto);
      const localVarPath = `/circles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateCircleDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} memberId
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateMember: async (
      memberId: string,
      memberDto: MemberDto,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'memberId' is not null or undefined
      assertParamExists("updateMember", "memberId", memberId);
      // verify required parameter 'memberDto' is not null or undefined
      assertParamExists("updateMember", "memberDto", memberDto);
      const localVarPath = `/circles/members/{memberId}`.replace(
        `{${"memberId"}}`,
        encodeURIComponent(String(memberId)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(memberDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * CirclesApi - functional programming interface
 * @export
 */
export const CirclesApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = CirclesApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {string} id
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addMember(
      id: string,
      memberDto: MemberDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addMember(id, memberDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.addMember"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {CreateCircleDto} createCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async create(
      createCircleDto: CreateCircleDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CirclePayload>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.create(createCircleDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.create"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findAll(
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CirclePayload>>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.findAll(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.findAll"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {FindAllUserCirclesStatusEnum} [status]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findAllUserCircles(
      status?: FindAllUserCirclesStatusEnum,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CirclePayload>>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.findAllUserCircles(status, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.findAllUserCircles"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findOne(
      id: string,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CirclePayload>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.findOne(id, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.findOne"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async remove(
      id: string,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.remove(id, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.remove"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} circleId
     * @param {string} memberId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async removeMember(
      circleId: string,
      memberId: string,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.removeMember(circleId, memberId, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.removeMember"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} id
     * @param {UpdateCircleDto} updateCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async update(
      id: string,
      updateCircleDto: UpdateCircleDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CirclePayload>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.update(id, updateCircleDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.update"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} memberId
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateMember(
      memberId: string,
      memberDto: MemberDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CircleMemberPayload>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateMember(memberId, memberDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["CirclesApi.updateMember"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * CirclesApi - factory interface
 * @export
 */
export const CirclesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = CirclesApiFp(configuration);
  return {
    /**
     *
     * @param {string} id
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addMember(id: string, memberDto: MemberDto, options?: RawAxiosRequestConfig): AxiosPromise<void> {
      return localVarFp.addMember(id, memberDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {CreateCircleDto} createCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    create(createCircleDto: CreateCircleDto, options?: RawAxiosRequestConfig): AxiosPromise<CirclePayload> {
      return localVarFp.create(createCircleDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findAll(options?: RawAxiosRequestConfig): AxiosPromise<Array<CirclePayload>> {
      return localVarFp.findAll(options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {FindAllUserCirclesStatusEnum} [status]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findAllUserCircles(
      status?: FindAllUserCirclesStatusEnum,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Array<CirclePayload>> {
      return localVarFp.findAllUserCircles(status, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findOne(id: string, options?: RawAxiosRequestConfig): AxiosPromise<CirclePayload> {
      return localVarFp.findOne(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    remove(id: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
      return localVarFp.remove(id, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} circleId
     * @param {string} memberId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeMember(circleId: string, memberId: string, options?: RawAxiosRequestConfig): AxiosPromise<void> {
      return localVarFp.removeMember(circleId, memberId, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} id
     * @param {UpdateCircleDto} updateCircleDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    update(id: string, updateCircleDto: UpdateCircleDto, options?: RawAxiosRequestConfig): AxiosPromise<CirclePayload> {
      return localVarFp.update(id, updateCircleDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} memberId
     * @param {MemberDto} memberDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateMember(
      memberId: string,
      memberDto: MemberDto,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<CircleMemberPayload> {
      return localVarFp.updateMember(memberId, memberDto, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * CirclesApi - object-oriented interface
 * @export
 * @class CirclesApi
 * @extends {BaseAPI}
 */
export class CirclesApi extends BaseAPI {
  /**
   *
   * @param {string} id
   * @param {MemberDto} memberDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public addMember(id: string, memberDto: MemberDto, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .addMember(id, memberDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {CreateCircleDto} createCircleDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public create(createCircleDto: CreateCircleDto, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .create(createCircleDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public findAll(options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .findAll(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {FindAllUserCirclesStatusEnum} [status]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public findAllUserCircles(status?: FindAllUserCirclesStatusEnum, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .findAllUserCircles(status, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public findOne(id: string, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .findOne(id, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public remove(id: string, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .remove(id, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} circleId
   * @param {string} memberId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public removeMember(circleId: string, memberId: string, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .removeMember(circleId, memberId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} id
   * @param {UpdateCircleDto} updateCircleDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public update(id: string, updateCircleDto: UpdateCircleDto, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .update(id, updateCircleDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} memberId
   * @param {MemberDto} memberDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CirclesApi
   */
  public updateMember(memberId: string, memberDto: MemberDto, options?: RawAxiosRequestConfig) {
    return CirclesApiFp(this.configuration)
      .updateMember(memberId, memberDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * @export
 */
export const FindAllUserCirclesStatusEnum = {
  Pending: "PENDING",
  Active: "ACTIVE",
  Completed: "COMPLETED",
} as const;
export type FindAllUserCirclesStatusEnum =
  (typeof FindAllUserCirclesStatusEnum)[keyof typeof FindAllUserCirclesStatusEnum];
