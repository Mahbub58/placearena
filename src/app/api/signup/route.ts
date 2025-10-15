import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password, role } = body;

    const apiResponse = await fetch(
      `${process.env.BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          role: role,
          password,
          phoneNumber: phone,
        }),
      }
    );
    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: responseData.message || "Registration failed" },
        { status: apiResponse.status }
      );
    }

    return NextResponse.json(responseData, { status: apiResponse.status });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
