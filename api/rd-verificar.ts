export default async function handler(req: Request) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers,
      });
    }
  
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers,
      });
    }
  
    try {
      const body = await req.json();
  
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
      const response = await fetch(
        'https://atp-pruebas.ecom.com.ar/ATPGestion15Prueba/rest/RD_Verificar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        }
      );
  
      clearTimeout(timeout);
  
      const contentType = response.headers.get('content-type') || '';
  
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
        data = JSON.stringify(data);
      } else {
        data = await response.text();
      }
  
      return new Response(data, {
        status: response.status,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: 'Proxy error',
          message: error?.message || 'Unknown error',
        }),
        {
          status: 500,
          headers,
        }
      );
    }
  }