import "server-only";
import { createClient, type ClientConfig, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion, token, mode } from "@/lib/env.api";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: mode === "development" ? true : false,
  ignoreBrowserTokenWarning: true,
  token,
  perspective: "published",
};

const client = createClient(config);

// Export client for write operations (like contact form submissions)
export const sanityClient = client;

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: mode === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
