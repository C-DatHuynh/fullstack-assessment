import 'node-fetch';
import pLimit from 'p-limit';

export interface Server {
  url: string;
  priority: number;
}

/**
 * Function to check server status
 * @param server - target server
 * @param [timeout=5000] - timeout for server response, default is 5 seconds
 * @return is server online ?
 */
export async function isServerOnline(server: Server, timeout: number = 5000) {
  try {
    const response = await fetch(server.url, { signal: AbortSignal.timeout(timeout) });
    return response.status >= 200 && response.status <= 299;
  } catch (error) {
    return false;
  }
}

/**
 * Function to find online server with the lowest priority
 * @param servers - list of target server
 * @param concurrencyLimit - number of parallel server calls
 * @return online server with the lowest priority
 */

export async function findServer(
  servers: Server[],
  concurrencyLimit: number = 10
): Promise<Server> {
  const limit = pLimit(concurrencyLimit);
  const checkPromise = async (server: Server) => {
    const isOnline = await isServerOnline(server);
    return { server, isOnline };
  };
  const checkPromises = servers.map((server: Server) => limit(() => checkPromise(server)));

  const results = await Promise.all(checkPromises);
  const onlineServers = results.filter((result) => result.isOnline).map((result) => result.server);
  if (onlineServers.length === 0) {
    throw new Error('No servers are online!');
  }

  onlineServers.sort((a, b) => a.priority - b.priority);
  return onlineServers[0];
}
