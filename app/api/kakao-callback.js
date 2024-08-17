// pages/api/kakao-callback.js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // 여기서 code를 사용하여 액세스 토큰을 요청합니다
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

    // 토큰을 사용하여 사용자 정보를 요청할 수 있습니다
    // 여기서 추가 로직을 구현하세요 (예: 사용자 정보 저장, 세션 생성 등)

    // 로그인 성공 후 리디렉션
    res.redirect('/form');  // 또는 다른 적절한 페이지로 리디렉션
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}