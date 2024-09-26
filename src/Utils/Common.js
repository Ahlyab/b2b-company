import moment from "moment";
import { baseUrl } from "../config/config";

function getMaxId(data) {
  if (data.length === 0) {
    return null;
  }

  const maxId = data.reduce((max, item) => {
    const id = parseInt(item.id, 10);
    return id > max ? id : max;
  }, -Infinity);

  return maxId;
}

async function fetchAndFindMaxId(path) {
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json(); // Assuming the data is in JSON format
    console.log("Data: ", data);
    const maxId = getMaxId(data);
    return maxId;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function formatDateTime(dateString) {
  const date = moment(dateString);
  const formattedDate = date.format("DD-MM-YYYY, h:mm:ss A");

  return formattedDate;
}

const fetchData = async (url, setData, setLoading, manipulateData) => {
  try {
    const response = await fetch(url, { method: "GET" });
    let data = await response.json();
    if (manipulateData) {
      data = manipulateData(data);
    }
    setData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

export { getMaxId, fetchAndFindMaxId, formatDateTime, fetchData };
