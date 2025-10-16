"use server";
import { revalidateTag } from "next/cache";

export const updateProfile = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Record<string, unknown>;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to update user: ${res.statusText}`);
  }
  const data = await res.json();

  revalidateTag("profile");

  return data;
};

export const sendOtpToPhone = async ({
  phone,
  id,
}: {
  phone: string;
  id: string;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/users/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      phone: phone,
    }),
  });
  const data = await res.json();

  return data;
};

export const verifyOtpFromPhone = async ({
  id,
  code,
}: {
  id: string;
  code: string;
}) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/users/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        code: code,
      }),
    }
  );
  const data = await res.json();

  return data;
};

export const getUserProperties = async (ownerId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/property/owner/${ownerId}`,
    {
      method: "GET",
      credentials: "include",
      next: { tags: ["profile"], revalidate: 0 },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export const deleteProperty = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/property/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete property: ${res.statusText}`);
  }

  const data = await res.json();
  revalidateTag("profile");
  return data;
};

export const updateProperty = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Record<string, unknown>;
}) => {
  const res = await fetch(`${process.env.BACKEND_URL}/property/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to update property: ${res.statusText}`);
  }

  const data = await res.json();
  revalidateTag("profile");
  return data;
};
