import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, setUser, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          // Use the access token (JWT) for API requests
          console.log(accessToken);

          const response = await fetch('/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          });

          if (response.ok) {
            const userProfile = await response.json();
            setUser({ ...user, name: userProfile.name, picture: userProfile.picture });
          } else {
            // Handle error response
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, setUser, user, getAccessTokenSilently]);

  return (
    <>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && (
        <div>
          <p>Welcome, {user.name}</p>
          <img src={user.picture} alt="Profile" />
          {/* Additional content */}
        </div>
      )}
    </>
  );
}

export default LoginButton;