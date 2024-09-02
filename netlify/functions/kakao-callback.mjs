import fetch from 'node-fetch';

export const handler = async (event, context) => 
{
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing authorization code' }),
    };
  }

  try {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '1e16826fb9c26b29181927d4c69fc121',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log(tokenData);
    // 토큰 데이터를 사용하여 필요한 처리를 수행 (예: 사용자 정보 저장)

    // 클라이언트 사이드 리다이렉션을 위한 HTML 응답
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <html>
          <head>
            <script>
              window.location.href = '/form';
            </script>
          </head>
          <body>
            <p>로그인 성공! 리다이렉트 중...</p>
          </body>
        </html>
      `,
    };
  } catch (error) {
    console.error('Error during Kakao login:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};