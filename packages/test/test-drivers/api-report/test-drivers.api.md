## API Report File for "@fluid-private/test-drivers"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { createLocalResolverCreateNewRequest } from '@fluidframework/local-driver';
import { createOdspCreateContainerRequest } from '@fluidframework/odsp-driver';
import { createOdspUrl } from '@fluidframework/odsp-driver';
import { HostStoragePolicy } from '@fluidframework/odsp-driver-definitions';
import { IDocumentServiceFactory } from '@fluidframework/driver-definitions';
import { ILocalDeltaConnectionServer } from '@fluidframework/server-local-server';
import { InsecureTinyliciousUrlResolver } from '@fluidframework/tinylicious-driver';
import { InsecureUrlResolver } from '@fluidframework/driver-utils';
import { IRequest } from '@fluidframework/core-interfaces';
import { IResolvedUrl } from '@fluidframework/driver-definitions';
import { ITestDriver } from '@fluidframework/test-driver-definitions';
import { IUrlResolver } from '@fluidframework/driver-definitions';
import { LocalDeltaConnectionServer } from '@fluidframework/server-local-server';
import { LocalDocumentServiceFactory } from '@fluidframework/local-driver';
import { LocalResolver } from '@fluidframework/local-driver';
import { OdspDocumentServiceFactory } from '@fluidframework/odsp-driver';
import { OdspDriverUrlResolver } from '@fluidframework/odsp-driver';
import { OdspEndpoint } from '@fluidframework/test-driver-definitions';
import { RouterliciousDocumentServiceFactory } from '@fluidframework/routerlicious-driver';
import { RouterliciousEndpoint } from '@fluidframework/test-driver-definitions';
import { TestDriverTypes } from '@fluidframework/test-driver-definitions';

// @internal (undocumented)
export function assertOdspEndpoint(endpoint: string | undefined): asserts endpoint is OdspEndpoint | undefined;

// @internal (undocumented)
export function assertRouterliciousEndpoint(endpoint: string | undefined): asserts endpoint is RouterliciousEndpoint | undefined;

// @internal (undocumented)
export function createFluidTestDriver(fluidTestDriverType?: TestDriverTypes, config?: FluidTestDriverConfig, api?: DriverApiType): Promise<LocalServerTestDriver | TinyliciousTestDriver | RouterliciousTestDriver | OdspTestDriver>;

// @internal (undocumented)
export type CreateFromEnvConfigParam<T extends (config: any, ...args: any) => any> = T extends (config: infer P, ...args: any) => any ? P : never;

// @internal (undocumented)
export const DriverApi: DriverApiType;

// @internal (undocumented)
export interface DriverApiType {
    // (undocumented)
    LocalDriverApi: LocalDriverApiType;
    // (undocumented)
    OdspDriverApi: OdspDriverApiType;
    // (undocumented)
    RouterliciousDriverApi: RouterliciousDriverApiType;
}

// @internal (undocumented)
export interface FluidTestDriverConfig {
    // (undocumented)
    odsp?: CreateFromEnvConfigParam<typeof OdspTestDriver.createFromEnv>;
    // (undocumented)
    r11s?: CreateFromEnvConfigParam<typeof RouterliciousTestDriver.createFromEnv>;
}

// @internal (undocumented)
export const generateOdspHostStoragePolicy: (seed: number) => HostStoragePolicy[];

// @internal (undocumented)
export const LocalDriverApi: {
    version: string;
    LocalDocumentServiceFactory: typeof LocalDocumentServiceFactory;
    LocalDeltaConnectionServer: typeof LocalDeltaConnectionServer;
    LocalResolver: typeof LocalResolver;
    createLocalResolverCreateNewRequest: typeof createLocalResolverCreateNewRequest;
};

// @internal (undocumented)
export type LocalDriverApiType = typeof LocalDriverApi;

// @internal (undocumented)
export class LocalServerTestDriver implements ITestDriver {
    constructor(api?: LocalDriverApiType);
    // (undocumented)
    createContainerUrl(testId: string): Promise<string>;
    // (undocumented)
    createCreateNewRequest(testId: string): IRequest;
    // (undocumented)
    createDocumentServiceFactory(): IDocumentServiceFactory;
    // (undocumented)
    createUrlResolver(): IUrlResolver;
    // (undocumented)
    readonly endpointName = "local";
    // (undocumented)
    get server(): ILocalDeltaConnectionServer;
    // (undocumented)
    readonly type = "local";
    // (undocumented)
    get version(): string;
}

// @internal (undocumented)
export const OdspDriverApi: {
    version: string;
    OdspDocumentServiceFactory: typeof OdspDocumentServiceFactory;
    OdspDriverUrlResolver: typeof OdspDriverUrlResolver;
    createOdspCreateContainerRequest: typeof createOdspCreateContainerRequest;
    createOdspUrl: typeof createOdspUrl;
};

// @internal (undocumented)
export type OdspDriverApiType = typeof OdspDriverApi;

// @internal (undocumented)
export class OdspTestDriver implements ITestDriver {
    createContainerUrl(testId: string): Promise<string>;
    // (undocumented)
    createCreateNewRequest(testId: string): IRequest;
    // (undocumented)
    createDocumentServiceFactory(): IDocumentServiceFactory;
    // (undocumented)
    static createFromEnv(config?: {
        directory?: string;
        username?: string;
        options?: HostStoragePolicy;
        supportsBrowserAuth?: boolean;
        tenantIndex?: number;
        odspEndpointName?: string;
    }, api?: OdspDriverApiType): Promise<OdspTestDriver>;
    // (undocumented)
    createUrlResolver(): IUrlResolver;
    // (undocumented)
    readonly endpointName?: string | undefined;
    // (undocumented)
    getUrlFromItemId(itemId: string): string;
    // (undocumented)
    readonly tenantName?: string | undefined;
    // (undocumented)
    readonly type = "odsp";
    // (undocumented)
    readonly userIndex?: number | undefined;
    // (undocumented)
    get version(): string;
}

// @internal (undocumented)
export const RouterliciousDriverApi: {
    version: string;
    modulePath: string;
    RouterliciousDocumentServiceFactory: typeof RouterliciousDocumentServiceFactory;
};

// @internal (undocumented)
export type RouterliciousDriverApiType = typeof RouterliciousDriverApi;

// @internal (undocumented)
export class RouterliciousTestDriver implements ITestDriver {
    // (undocumented)
    createContainerUrl(testId: string, containerUrl?: IResolvedUrl): Promise<string>;
    // (undocumented)
    createCreateNewRequest(testId: string): IRequest;
    // (undocumented)
    createDocumentServiceFactory(): IDocumentServiceFactory;
    // (undocumented)
    static createFromEnv(config?: {
        r11sEndpointName?: string;
    }, api?: RouterliciousDriverApiType): RouterliciousTestDriver;
    // (undocumented)
    createUrlResolver(): InsecureUrlResolver;
    // (undocumented)
    readonly endpointName?: string | undefined;
    // (undocumented)
    readonly type = "routerlicious";
    // (undocumented)
    get version(): string;
}

// @internal (undocumented)
export class TinyliciousTestDriver implements ITestDriver {
    constructor(api?: RouterliciousDriverApiType);
    // (undocumented)
    createContainerUrl(testId: string, containerUrl?: IResolvedUrl): Promise<string>;
    // (undocumented)
    createCreateNewRequest(testId: string): IRequest;
    // (undocumented)
    createDocumentServiceFactory(): IDocumentServiceFactory;
    // (undocumented)
    createUrlResolver(): InsecureTinyliciousUrlResolver;
    // (undocumented)
    readonly endpointName = "local";
    // (undocumented)
    readonly type = "tinylicious";
    // (undocumented)
    get version(): string;
}

// (No @packageDocumentation comment for this package)

```
