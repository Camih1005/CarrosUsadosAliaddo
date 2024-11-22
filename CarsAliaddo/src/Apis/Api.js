export const useFetch = () => {
  const BASE_URL = "https://localhost:7016/api";

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      return null;
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  };

  const list = async (ruta = '', options = {}) => {
    const url = `${BASE_URL}${ruta}`;
    try {
      const defaultOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, { ...defaultOptions, ...options });
      return handleResponse(response);
    } catch (error) {
      console.error("Error en la operación:", error);
      throw error;
    }
  };

  const update = async (ruta, data) => {
    const url = `${BASE_URL}${ruta}`;
    try {
      console.log('Enviando datos de actualización:', data);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Respuesta recibida:', response);
      return handleResponse(response);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      throw error;
    }
  };

  const remove = async (ruta) => {
    const url = `${BASE_URL}${ruta}`;
    try {
      console.log('Enviando solicitud de eliminación:', url);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Respuesta recibida:', response);
      return handleResponse(response);
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
      throw error;
    }
  };
    // Enviar datos del formulario
    const submitForm = async (formData) => {
      const url = `${BASE_URL}/formulario`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        throw error;
      }
    };

  return { list, update, remove,submitForm };
};

