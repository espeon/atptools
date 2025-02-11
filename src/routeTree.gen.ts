/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FirehoseIndexImport } from './routes/firehose/index'
import { Route as AtHandleIndexImport } from './routes/at:/$handle.index'

// Create Virtual Routes

const CounterLazyImport = createFileRoute('/counter')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const RnfgrerttIndexLazyImport = createFileRoute('/rnfgrertt/')()
const RnfgrerttTypingLazyImport = createFileRoute('/rnfgrertt/typing')()
const PdsUrlIndexLazyImport = createFileRoute('/pds/$url/')()
const AtHandleCollectionIndexLazyImport = createFileRoute(
  '/at:/$handle/$collection/',
)()
const AtHandleCollectionRkeyLazyImport = createFileRoute(
  '/at:/$handle/$collection/$rkey',
)()

// Create/Update Routes

const CounterLazyRoute = CounterLazyImport.update({
  id: '/counter',
  path: '/counter',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/counter.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const RnfgrerttIndexLazyRoute = RnfgrerttIndexLazyImport.update({
  id: '/rnfgrertt/',
  path: '/rnfgrertt/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/rnfgrertt/index.lazy').then((d) => d.Route),
)

const FirehoseIndexRoute = FirehoseIndexImport.update({
  id: '/firehose/',
  path: '/firehose/',
  getParentRoute: () => rootRoute,
} as any)

const RnfgrerttTypingLazyRoute = RnfgrerttTypingLazyImport.update({
  id: '/rnfgrertt/typing',
  path: '/rnfgrertt/typing',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/rnfgrertt/typing.lazy').then((d) => d.Route),
)

const PdsUrlIndexLazyRoute = PdsUrlIndexLazyImport.update({
  id: '/pds/$url/',
  path: '/pds/$url/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/pds/$url.index.lazy').then((d) => d.Route),
)

const AtHandleIndexRoute = AtHandleIndexImport.update({
  id: '/at:/$handle/',
  path: '/at:/$handle/',
  getParentRoute: () => rootRoute,
} as any)

const AtHandleCollectionIndexLazyRoute =
  AtHandleCollectionIndexLazyImport.update({
    id: '/at:/$handle/$collection/',
    path: '/at:/$handle/$collection/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/at:/$handle/$collection.index.lazy').then((d) => d.Route),
  )

const AtHandleCollectionRkeyLazyRoute = AtHandleCollectionRkeyLazyImport.update(
  {
    id: '/at:/$handle/$collection/$rkey',
    path: '/at:/$handle/$collection/$rkey',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/at:/$handle/$collection.$rkey.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/counter': {
      id: '/counter'
      path: '/counter'
      fullPath: '/counter'
      preLoaderRoute: typeof CounterLazyImport
      parentRoute: typeof rootRoute
    }
    '/rnfgrertt/typing': {
      id: '/rnfgrertt/typing'
      path: '/rnfgrertt/typing'
      fullPath: '/rnfgrertt/typing'
      preLoaderRoute: typeof RnfgrerttTypingLazyImport
      parentRoute: typeof rootRoute
    }
    '/firehose/': {
      id: '/firehose/'
      path: '/firehose'
      fullPath: '/firehose'
      preLoaderRoute: typeof FirehoseIndexImport
      parentRoute: typeof rootRoute
    }
    '/rnfgrertt/': {
      id: '/rnfgrertt/'
      path: '/rnfgrertt'
      fullPath: '/rnfgrertt'
      preLoaderRoute: typeof RnfgrerttIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/at:/$handle/': {
      id: '/at:/$handle/'
      path: '/at:/$handle'
      fullPath: '/at:/$handle'
      preLoaderRoute: typeof AtHandleIndexImport
      parentRoute: typeof rootRoute
    }
    '/pds/$url/': {
      id: '/pds/$url/'
      path: '/pds/$url'
      fullPath: '/pds/$url'
      preLoaderRoute: typeof PdsUrlIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/at:/$handle/$collection/$rkey': {
      id: '/at:/$handle/$collection/$rkey'
      path: '/at:/$handle/$collection/$rkey'
      fullPath: '/at:/$handle/$collection/$rkey'
      preLoaderRoute: typeof AtHandleCollectionRkeyLazyImport
      parentRoute: typeof rootRoute
    }
    '/at:/$handle/$collection/': {
      id: '/at:/$handle/$collection/'
      path: '/at:/$handle/$collection'
      fullPath: '/at:/$handle/$collection'
      preLoaderRoute: typeof AtHandleCollectionIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/counter': typeof CounterLazyRoute
  '/rnfgrertt/typing': typeof RnfgrerttTypingLazyRoute
  '/firehose': typeof FirehoseIndexRoute
  '/rnfgrertt': typeof RnfgrerttIndexLazyRoute
  '/at:/$handle': typeof AtHandleIndexRoute
  '/pds/$url': typeof PdsUrlIndexLazyRoute
  '/at:/$handle/$collection/$rkey': typeof AtHandleCollectionRkeyLazyRoute
  '/at:/$handle/$collection': typeof AtHandleCollectionIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/counter': typeof CounterLazyRoute
  '/rnfgrertt/typing': typeof RnfgrerttTypingLazyRoute
  '/firehose': typeof FirehoseIndexRoute
  '/rnfgrertt': typeof RnfgrerttIndexLazyRoute
  '/at:/$handle': typeof AtHandleIndexRoute
  '/pds/$url': typeof PdsUrlIndexLazyRoute
  '/at:/$handle/$collection/$rkey': typeof AtHandleCollectionRkeyLazyRoute
  '/at:/$handle/$collection': typeof AtHandleCollectionIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/counter': typeof CounterLazyRoute
  '/rnfgrertt/typing': typeof RnfgrerttTypingLazyRoute
  '/firehose/': typeof FirehoseIndexRoute
  '/rnfgrertt/': typeof RnfgrerttIndexLazyRoute
  '/at:/$handle/': typeof AtHandleIndexRoute
  '/pds/$url/': typeof PdsUrlIndexLazyRoute
  '/at:/$handle/$collection/$rkey': typeof AtHandleCollectionRkeyLazyRoute
  '/at:/$handle/$collection/': typeof AtHandleCollectionIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/counter'
    | '/rnfgrertt/typing'
    | '/firehose'
    | '/rnfgrertt'
    | '/at:/$handle'
    | '/pds/$url'
    | '/at:/$handle/$collection/$rkey'
    | '/at:/$handle/$collection'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/counter'
    | '/rnfgrertt/typing'
    | '/firehose'
    | '/rnfgrertt'
    | '/at:/$handle'
    | '/pds/$url'
    | '/at:/$handle/$collection/$rkey'
    | '/at:/$handle/$collection'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/counter'
    | '/rnfgrertt/typing'
    | '/firehose/'
    | '/rnfgrertt/'
    | '/at:/$handle/'
    | '/pds/$url/'
    | '/at:/$handle/$collection/$rkey'
    | '/at:/$handle/$collection/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  CounterLazyRoute: typeof CounterLazyRoute
  RnfgrerttTypingLazyRoute: typeof RnfgrerttTypingLazyRoute
  FirehoseIndexRoute: typeof FirehoseIndexRoute
  RnfgrerttIndexLazyRoute: typeof RnfgrerttIndexLazyRoute
  AtHandleIndexRoute: typeof AtHandleIndexRoute
  PdsUrlIndexLazyRoute: typeof PdsUrlIndexLazyRoute
  AtHandleCollectionRkeyLazyRoute: typeof AtHandleCollectionRkeyLazyRoute
  AtHandleCollectionIndexLazyRoute: typeof AtHandleCollectionIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  CounterLazyRoute: CounterLazyRoute,
  RnfgrerttTypingLazyRoute: RnfgrerttTypingLazyRoute,
  FirehoseIndexRoute: FirehoseIndexRoute,
  RnfgrerttIndexLazyRoute: RnfgrerttIndexLazyRoute,
  AtHandleIndexRoute: AtHandleIndexRoute,
  PdsUrlIndexLazyRoute: PdsUrlIndexLazyRoute,
  AtHandleCollectionRkeyLazyRoute: AtHandleCollectionRkeyLazyRoute,
  AtHandleCollectionIndexLazyRoute: AtHandleCollectionIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/counter",
        "/rnfgrertt/typing",
        "/firehose/",
        "/rnfgrertt/",
        "/at:/$handle/",
        "/pds/$url/",
        "/at:/$handle/$collection/$rkey",
        "/at:/$handle/$collection/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/counter": {
      "filePath": "counter.lazy.tsx"
    },
    "/rnfgrertt/typing": {
      "filePath": "rnfgrertt/typing.lazy.tsx"
    },
    "/firehose/": {
      "filePath": "firehose/index.tsx"
    },
    "/rnfgrertt/": {
      "filePath": "rnfgrertt/index.lazy.tsx"
    },
    "/at:/$handle/": {
      "filePath": "at:/$handle.index.tsx"
    },
    "/pds/$url/": {
      "filePath": "pds/$url.index.lazy.tsx"
    },
    "/at:/$handle/$collection/$rkey": {
      "filePath": "at:/$handle/$collection.$rkey.lazy.tsx"
    },
    "/at:/$handle/$collection/": {
      "filePath": "at:/$handle/$collection.index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
