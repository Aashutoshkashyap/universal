import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ 
      success: false, 
      error: "Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables." 
    });
  }

  // Use the pg endpoint to run raw SQL — this requires the service role key
  const sql = `
    CREATE TABLE IF NOT EXISTS page_content (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      section_name TEXT UNIQUE NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  const projectRef = supabaseUrl.replace("https://", "").split(".")[0];

  try {
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ query: sql }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      // Try direct Supabase REST SQL endpoint as fallback
      return NextResponse.json({ 
        success: false, 
        error: data.message || "Management API failed. Please create the table manually.",
        sql: sql.trim(),
        hint: "Run the above SQL in your Supabase SQL Editor at https://supabase.com/dashboard"
      });
    }

    return NextResponse.json({ success: true, message: "Table created successfully!" });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
