export const verifyAuth = async (token) => {
  try {
    const verification = await fetch('http://localhost:3001/auth/validate-token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    }).then(res => res.json());
    if (verification.error) throw new Error(JSON.stringify({ error: verification.error }));
    return verification;
  } catch (err) {
    window.localStorage.setItem('som@ida', '');
    window.localStorage.setItem('som@token', '');
    return undefined;
  }
};

export default verifyAuth;
