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
import type { LoginDto, RegisterDto } from "../models";

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {LoginDto} loginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login: async (loginDto: LoginDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'loginDto' is not null or undefined
      assertParamExists("login", "loginDto", loginDto);
      const localVarPath = `/auth/login`;
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
      localVarRequestOptions.data = serializeDataIfNeeded(loginDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {RegisterDto} registerDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register: async (registerDto: RegisterDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'registerDto' is not null or undefined
      assertParamExists("register", "registerDto", registerDto);
      const localVarPath = `/auth/register`;
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
      localVarRequestOptions.data = serializeDataIfNeeded(registerDto, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {LoginDto} loginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async login(
      loginDto: LoginDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["AuthApi.login"]?.[localVarOperationServerIndex]?.url;
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
     * @param {RegisterDto} registerDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async register(
      registerDto: RegisterDto,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.register(registerDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["AuthApi.register"]?.[localVarOperationServerIndex]?.url;
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
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = AuthApiFp(configuration);
  return {
    /**
     *
     * @param {LoginDto} loginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(loginDto: LoginDto, options?: RawAxiosRequestConfig): AxiosPromise<void> {
      return localVarFp.login(loginDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {RegisterDto} registerDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register(registerDto: RegisterDto, options?: RawAxiosRequestConfig): AxiosPromise<void> {
      return localVarFp.register(registerDto, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
  /**
   *
   * @param {LoginDto} loginDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public login(loginDto: LoginDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .login(loginDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {RegisterDto} registerDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public register(registerDto: RegisterDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .register(registerDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
