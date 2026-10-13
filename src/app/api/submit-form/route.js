// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const GOOGLE_SCRIPT_URL =
//       "https://script.google.com/macros/s/AKfycbz7H3muxqLcYCqohqfAomaS_GO7H8UsZW1NFSgnLuk21p2O2O6KRy2zg0pnTfvKJC65nQ/exec";

//     const response = await fetch(GOOGLE_SCRIPT_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     // ✅ Log full response to debug
//     const text = await response.text(); // Read response as text
//     console.log("🔹 Google Script Response:", text); // Log it

//     if (!response.ok) {
//       throw new Error(
//         `Google Sheets API error! Status: ${response.status}, Response: ${text}`
//       );
//     }

//     const responseData = JSON.parse(text);
//     return Response.json(responseData);
//   } catch (error) {
//     console.error("❌ API Route Error:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500 }
//     );
//   }
// }
export async function POST(req) {
  try {
    const formData = await req.json();
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwtLBcBQaEX6WKIggs3JGH0r5MJWigyHYS0soxJDKOvdy8Q0GiRJWO4V45NVm0Slvygkg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const text = await response.text(); // ✅ Get raw response
    console.log("🔍 Raw Response:", text); // ✅ Debug response before parsing

    try {
      const responseData = JSON.parse(text); // 🔹 Parse only if valid JSON
      return Response.json(responseData);
    } catch (jsonError) {
      console.error("❌ JSON Parse Error:", jsonError);
      return Response.json({ error: "Invalid JSON response", raw: text });
    }
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return Response.json({
      error: "API Route Failed",
      details: error.toString(),
    });
  }
}
