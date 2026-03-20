export const getAddressByPostalCode = async (postalCode: string) => {
  const response = await fetch(
    `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=N&getAddrDetails=Y`,
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) return null;

  const result = data.results[0];
  return {
    block_house_number: result.BLK_NO || "",
    street_name: result.ROAD_NAME || "",
    building_name: result.BUILDING !== "NIL" ? result.BUILDING : "",
  };
};
