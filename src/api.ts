const URL = import.meta.env.VITE_AIDEVS_URL;

export const getData = async () => {
  try {
    const response = await fetch(`${URL}/dane.txt`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const textData = await response.text();
    const dataArray = textData.split("\n").filter((line) => line.trim() !== "");
    console.log(dataArray);
    return dataArray;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const sendData = async (data: any) => {
  try {
    const response = await fetch(`${URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "POLIGON",
        apikey: import.meta.env.VITE_PERSONAL_API_KEY,
        answer: data.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
