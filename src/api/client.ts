class Client {
  constructor(private baseUrl: string) {}

  private async fetch<T>(url: string, options: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, options)

    if (response.ok) {
      return response.json()
    }

    throw new Error(`${response.status} ${response.statusText}`)
  }

  public async get<T>(url: string): Promise<T> {
    return await this.fetch<T>(url, {
      method: "GET",
    })
  }

  public async post<T>(url: string, body: any): Promise<T> {
    return await this.fetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async put<T>(url: string, body: any): Promise<T> {
    return await this.fetch<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async delete<T>(url: string): Promise<T> {
    return await this.fetch<T>(url, {
      method: "DELETE",
    })
  }
}

export default new Client(process.env.REACT_APP_API_URL)
