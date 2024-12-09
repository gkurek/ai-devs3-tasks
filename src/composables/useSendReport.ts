export function useSendReport() {
  async function sendReport(task: string, answer: any) {
    const response = await fetch("/api/centrala/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
        apikey: import.meta.env.VITE_PERSONAL_API_KEY,
        answer,
      }),
    });
    const data = await response.json();
    return data;
  }

  return {
    sendReport,
  };
}
