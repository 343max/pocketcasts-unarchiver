import { z } from "zod"
import { podcastSchema } from "./podcast"

export const pocketCastsLogin = async (email: string, password: string) => {
  const api = "https://api.pocketcasts.com/"

  const unauthorizedRequest = async <T extends z.ZodTypeAny>(
    method: "POST" | "GET",
    path: string,
    model: T,
    headers: Record<string, string> = {},
    body?: any
  ): Promise<z.TypeOf<T>> => {
    const response = await fetch(`${api}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    return model.parse(await response.json())
  }

  const login = async () => {
    return unauthorizedRequest(
      "POST",
      "user/login",
      z.object({ token: z.string().optional() }),
      {},
      {
        email,
        password,
        scope: "webplayer",
      }
    )
  }

  const { token } = await login()

  if (token === undefined) {
    throw new Error("Login failed")
  }

  const request = async <T extends z.ZodTypeAny>(
    method: "POST" | "GET",
    path: string,
    model: T,
    body?: any
  ): Promise<z.TypeOf<T>> => {
    return unauthorizedRequest(method, path, model, { Authorization: `Bearer ${token}` }, body)
  }

  return {
    podcastList: async () => {
      return request("POST", "user/podcast/list", z.object({ podcasts: z.array(podcastSchema) }))
    },
  }
}
