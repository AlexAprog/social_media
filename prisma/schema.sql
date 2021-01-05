-- CREATE TABLE "public"."User" (
--     id SERIAL PRIMARY KEY NOT NULL,
--     username VARCHAR(255),
--     password VARCHAR(255),
--     "createdAt" TIMESTAMP NOT NULL DEFAULT now()
-- )

-- ALTER TABLE "public"."User" 
-- ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL 

-- CREATE TABLE "public"."Post"(
--     id SERIAL PRIMARY KEY NOT NULL,
--     body TEXT NOT NULL,
--     "userId" INTEGER NOT NULL,
--     FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
--     "createdAt" TIMESTAMP NOT NULL DEFAULT now()
-- );

-- CREATE TABLE "public"."Comment"(
--     id SERIAL PRIMARY KEY NOT NULL,
--     body TEXT NOT NULL,
--     "userId" INTEGER NOT NULL,
--     FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
--     "createdAt" TIMESTAMP NOT NULL DEFAULT now()
-- );

-- CREATE TABLE "public"."Like"(
--     id SERIAL PRIMARY KEY NOT NULL,
--     "userId" INTEGER NOT NULL,
--     FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
--     "createdAt" TIMESTAMP NOT NULL DEFAULT now()
-- )

-- ALTER TABLE "public". "Comment"
-- ADD COLUMN "postId" INTEGER NOT NULL,
-- ADD FOREIGN KEY ("postId") REFERENCES "public"."Post"

-- ALTER TABLE "public". "Like"
-- ADD COLUMN "postId" INTEGER NOT NULL,
-- ADD FOREIGN KEY ("postId") REFERENCES "public"."Post"