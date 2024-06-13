import 'node-fetch';

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
 * @return online server with the lowest priority
 */

export async function findServer(servers: Server[]): Promise<Server> {
  const checkPromises = servers.map(async (server) => {
    const isOnline = await isServerOnline(server);
    return { server, isOnline };
  });

  const results = await Promise.all(checkPromises);
  const onlineServers = results.filter((result) => result.isOnline).map((result) => result.server);
  if (onlineServers.length === 0) {
    throw new Error('No servers are online!');
  }

  onlineServers.sort((a, b) => a.priority - b.priority);
  return onlineServers[0];
}
