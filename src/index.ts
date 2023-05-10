/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  DB: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
}

// @ts-ignore
import index from './index.html';
import { makeSvg } from './util/makeSvg';

function handleHome() {
  return new Response(index, {
    headers: {
      'Content-Type': 'text/html;chartset=utf-8',
    },
  });
}

function handleNotFound() {
  return new Response(null, {
    status: 404,
  });
}

function handleBadRequest() {
  return new Response(null, {
    status: 400,
  });
}

async function handleVisit(searchParams: URLSearchParams, env: Env) {
  const url = searchParams.get('url');
  const type = searchParams.get('type') || 'json';
  const text = searchParams.get('text') || 'Counter';
  const bgcolor = searchParams.get('bgcolor') || '#000';

  if (!url) {
    return handleBadRequest();
  }
  const kvUrl = await env.DB.get(url);
  let value = 1;
  if (!kvUrl) {
    await env.DB.put(url, value + '');
  } else {
    value = parseInt(kvUrl) + 1;
    await env.DB.put(url, value + '');
  }

  if (type === 'svg') {
    return new Response(makeSvg(value, text, bgcolor), {
      headers: {
        'Content-Type': 'image/svg+xml;chartset=utf-8',
      },
    });
  } else {
    return new Response(JSON.stringify({ visits: value }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname, searchParams } = new URL(request.url);
    switch (pathname) {
      case '/':
        return handleHome();
      case '/visit':
        return handleVisit(searchParams, env);
      default:
        return handleNotFound();
    }
  },
};
