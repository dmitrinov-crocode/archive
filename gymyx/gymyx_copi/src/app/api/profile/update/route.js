export const dynamic = "force-dynamic" // defaults to force-static
export async function POST(request) {
  if (request.method === "POST") {
      const formData = await parseBody(request);
  } else {
    request.status(405).end()
  }
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let rawData = '';

    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', () => {
      try {
        const formData = new URLSearchParams(rawData);
        resolve(Object.fromEntries(formData));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}