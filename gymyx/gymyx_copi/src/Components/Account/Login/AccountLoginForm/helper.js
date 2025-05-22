// export const authTelegram = async (id) => {
//   const result = await fetch('/api/auth/telegramauth', {
//     cache: 'no-store',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ telegram_id: id }),
//   })
  
//     const response = await result.json();

//     if (response?.data) {
//       return response?.data;
//     } else {
//       return response
//     }
// };


  export async function authTelegram(id) {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/trusted`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegram_id: id }),
        });

        const response = await result.json();
  
        if (response?.data) {
          return response?.data;
        } else {
          return response
        } 
  
      } catch (error) {
        return Response.json({ error: 'Error fetching data' });
      }
  }