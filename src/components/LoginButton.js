import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, setUser, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          console.log(accessToken);
          const response = await fetch('/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.ok) {
            const userProfile = await response.json();
            setUser({ ...user, name: userProfile.name, picture: userProfile.picture });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, setUser, user, getAccessTokenSilently]);

  return (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
}

export default LoginButton;