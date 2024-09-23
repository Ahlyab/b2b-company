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

async function fetchAndFindMaxId(url) {
  try {
    const response = await fetch(url);
    const data = await response.json(); // Assuming the data is in JSON format
    console.log("Data: ", data);
    const maxId = getMaxId(data);
    return maxId;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export { getMaxId, fetchAndFindMaxId };
