/**
 * Minimal Upstash Redis REST client.
 *
 * Works with both the Upstash integration variables (`UPSTASH_REDIS_REST_*`)
 * and the Vercel Marketplace Redis/KV ones (`KV_REST_API_*`), so you can pick
 * whichever provider flow you prefer. No SDK dependency is required.
 */

export type RedisCommand = (string | number)[];

interface RedisResponse<T> {
  result?: T;
  error?: string;
}

function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export function isStoreConfigured(): boolean {
  return config() !== null;
}

export async function redisCommand<T = unknown>(command: RedisCommand): Promise<T | null> {
  const cfg = config();
  if (!cfg) return null;

  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Redis command failed with status ${res.status}`);
  }

  const data = (await res.json()) as RedisResponse<T>;
  if (data.error) throw new Error(data.error);

  return data.result ?? null;
}

/** Runs several commands in a single round trip. Returns results in order. */
export async function redisPipeline<T = unknown>(commands: RedisCommand[]): Promise<T[]> {
  const cfg = config();
  if (!cfg) return [];
  if (commands.length === 0) return [];

  const res = await fetch(`${cfg.url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Redis pipeline failed with status ${res.status}`);
  }

  const data = (await res.json()) as RedisResponse<T>[];
  return data.map((entry) => {
    if (entry.error) throw new Error(entry.error);
    return entry.result as T;
  });
}
