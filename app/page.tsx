"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [schema, setSchema] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/schema")
      .then((res) => res.json())
      .then((data) => {
        setSchema(data.schema);
      });
  }, []);

  async function saveSchema(apply = false) {
    setStatus(apply ? "Applying..." : "Saving...");

    const response = await fetch("/api/schema", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schema,
        apply,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus(
        apply
          ? "✓ Schema applied to SQLite"
          : "✓ schema.prisma updated"
      );
    } else {
      setStatus(`✗ ${data.error}`);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Prisma Visualizer
          </h1>

          <span className="text-sm text-gray-500">
            schema.prisma
          </span>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-[2fr_1fr] gap-4">

          {/* ========================= */}
          {/* LEFT: CODE EDITOR */}
          {/* ========================= */}

          <div className="border border-gray-800 rounded-lg overflow-hidden">

            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
              <span className="text-sm text-gray-400">
                prisma/schema.prisma
              </span>

              <span className="text-xs text-gray-600">
                PRISMA
              </span>
            </div>

            {/* Monaco */}
            <Editor
              height="600px"
              language="prisma"
              theme="vs-dark"
              value={schema}
              onChange={(value) => setSchema(value ?? "")}
              options={{
                fontSize: 14,
                fontFamily: "monospace",

                // Indentation
                tabSize: 2,
                insertSpaces: true,
                detectIndentation: false,

                // Layout
                automaticLayout: true,

                // Minimap
                minimap: {
                  enabled: true,
                },

                wordWrap: "off",

                // Cursor
                cursorBlinking: "smooth",

                // Brackets
                bracketPairColorization: {
                  enabled: true,
                },

                // Suggestions
                suggestOnTriggerCharacters: true,

                // Padding
                padding: {
                  top: 16,
                  bottom: 16,
                },

                // Line numbers
                lineNumbers: "on",

                renderWhitespace: "selection",

                scrollBeyondLastLine: false,

                smoothScrolling: true,

                // Folding
                folding: true,

                overviewRulerBorder: false,
              }}
            />
          </div>


          <div className="border border-gray-800 rounded-lg overflow-hidden bg-black">

            {/* Syntax Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
              <span className="text-sm text-gray-300">
                Prisma Syntax
              </span>

              <span className="text-xs text-gray-600">
                CHEAT SHEET
              </span>
            </div>

            {/* Syntax Content */}
            <div className="h-[600px] overflow-y-auto p-5 space-y-7">

              {/* DATA TYPES */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  DATA TYPES
                </h2>

                <div className="space-y-2 text-sm text-gray-400">
                  <div>String</div>
                  <div>Int</div>
                  <div>Float</div>
                  <div>Boolean</div>
                  <div>DateTime</div>
                  <div>Json</div>
                  <div>Bytes</div>
                </div>
              </section>


              {/* MODEL */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  MODEL
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`model User {
  id   Int    @id
  name String
}`}
                </pre>
              </section>


              {/* PRIMARY KEY */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  PRIMARY KEY
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`id Int @id`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Marks a field as the primary key.
                </p>
              </section>


              {/* AUTO INCREMENT */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  AUTO INCREMENT
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`id Int @id @default(autoincrement())`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Automatically generates increasing IDs.
                </p>
              </section>


              {/* FOREIGN KEY */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  FOREIGN KEY / RELATION
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id     Int  @id @default(autoincrement())
  userId Int

  user User @relation(
    fields: [userId],
    references: [id]
  )
}`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  userId is the foreign key pointing to User.id.
                </p>
              </section>


              {/* OPTIONAL */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  OPTIONAL FIELD
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`name String?`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  The ? means the field can be null.
                </p>
              </section>


              {/* UNIQUE */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  UNIQUE
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`email String @unique`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Prevents duplicate values.
                </p>
              </section>


              {/* DEFAULT */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  DEFAULT VALUE
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`active Boolean @default(true)

name String @default("Unknown")`}
                </pre>
              </section>


              {/* DATE TIME */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  DATE / TIME
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`createdAt DateTime @default(now())

updatedAt DateTime @updatedAt`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  now() sets the creation time. @updatedAt
                  automatically updates the timestamp.
                </p>
              </section>


              {/* INDEX */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  INDEX
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`@@index([email])`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Creates a database index for faster queries.
                </p>
              </section>


              {/* COMPOSITE UNIQUE */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  COMPOSITE UNIQUE
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`@@unique([userId, postId])`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Makes a combination of fields unique.
                </p>
              </section>


              {/* ENUM */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  ENUM
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`enum Role {
  USER
  ADMIN
}

role Role`}
                </pre>
              </section>


              {/* ONE TO ONE */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  ONE-TO-ONE
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`user   User   @relation(...)
userId Int    @unique`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  @unique ensures only one related record exists.
                </p>
              </section>


              {/* ONE TO MANY */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  ONE-TO-MANY
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`model User {
  posts Post[]
}

model Post {
  user User
}`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  One User can have many Posts.
                </p>
              </section>


              {/* MANY TO MANY */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  MANY-TO-MANY
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`model User {
  posts Post[]
}

model Post {
  users User[]
}`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Multiple Users can have multiple Posts.
                </p>
              </section>


              {/* DELETE / UPDATE */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  RELATION ACTIONS
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
{`@relation(
  fields: [userId],
  references: [id],
  onDelete: Cascade,
  onUpdate: Cascade
)`}
                </pre>

                <p className="text-xs text-gray-600 mt-2">
                  Controls what happens when the referenced
                  record is deleted or updated.
                </p>
              </section>


              {/* COMMENTS */}
              <section>
                <h2 className="text-sm font-semibold text-white mb-3">
                  COMMENTS
                </h2>

                <pre className="text-xs text-gray-400 leading-5 whitespace-pre-wrap">
                </pre>
              </section>

            </div>
          </div>
        </div>


        {/* BOTTOM BAR */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex gap-3">

            <button
              onClick={() => saveSchema(false)}
              className="
                px-5
                py-2
                border
                border-gray-700
                text-gray-300
                rounded-md
                text-sm
                hover:bg-gray-900
                transition
              "
            >
              Save Schema
            </button>

            <button
              onClick={() => saveSchema(true)}
              className="
                px-5
                py-2
                bg-white
                text-black
                rounded-md
                text-sm
                font-semibold
                hover:bg-gray-200
                transition
              "
            >
              Apply
            </button>

          </div>

          <span className="text-sm text-gray-500">
            {status}
          </span>

        </div>

      </div>
    </main>
  );
}
