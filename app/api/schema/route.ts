import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  const schemaPath = path.join(
    process.cwd(),
    "prisma",
    "schema.prisma"
  );

  const schema = await readFile(schemaPath, "utf-8");

  return NextResponse.json({ schema });
}

export async function POST(request: Request) {
  try {
    const { schema, apply } = await request.json();

    if (typeof schema !== "string") {
      return NextResponse.json(
        { error: "Invalid schema" },
        { status: 400 }
      );
    }

    const schemaPath = path.join(
      process.cwd(),
      "prisma",
      "schema.prisma"
    );

    // Save schema.prisma
    await writeFile(schemaPath, schema, "utf-8");

    // Only update SQLite when Apply was requested
    if (apply) {
      await execAsync("npx prisma db push");
    }

    return NextResponse.json({
      success: true,
      applied: apply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to apply schema",
      },
      { status: 500 }
    );
  }
}
