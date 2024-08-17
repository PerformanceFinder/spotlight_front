export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // 토큰 요청 부분은 그대로 유지
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

    // 토큰 데이터를 사용하여 필요한 처리를 수행 (예: 사용자 정보 저장)

    // 리디렉션
    res.writeHead(302, { Location: '/form' });
    res.end();
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}