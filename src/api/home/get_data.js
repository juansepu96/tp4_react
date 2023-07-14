const getData = async (titulo) => {
  let key = "c678d402";
  var url = "https://www.omdbapi.com/?apikey="+key+"&t="+titulo;
  try {
      const response = await fetch(url); // Espera a que se resuelva la solicitud fetch
      const data = await response.json(); // Espera a que se convierta la respuesta en formato JSON
      return data; // Retorna los datos obtenidos de la API
  } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos");
  }
};

export default getData;
