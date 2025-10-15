"use server";

export async function getUserProfile({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) {
  try {
    // If we don't have an access token, try refreshing with the refresh token
    if (!accessToken) {
      if (refreshToken) {
        const refreshtokenRes = await fetch(
          `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
          {
            method: "POST",
            body: JSON.stringify({ refresh_token: refreshToken }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const accesTokenResponse = await refreshtokenRes.json();
        if (!!accesTokenResponse.accessToken) {
          return getUserProfile({ accessToken: accesTokenResponse.accessToken });
        }
      }
      return null;
    }

    // We have an access token, attempt to load profile
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const profileData = await res.json();

    if (profileData.success) {
      return profileData?.data;
    } else if (refreshToken) {
      // If access token failed, attempt refresh with provided refresh token
      const refreshtokenRes = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const accesTokenResponse = await refreshtokenRes.json();

      if (!!accesTokenResponse.accessToken) {
        return getUserProfile({ accessToken: accesTokenResponse.accessToken });
      }
    }
    return null;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
}

export const getHomePageProperties = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/property`,
    { next: { revalidate: 0 }, cache: "no-store" }
  );
  const data = await res.json();

  return data;
};
