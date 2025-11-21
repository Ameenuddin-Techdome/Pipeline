# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn add @swc/helpers styled-jsx @next/env
RUN yarn build


# ---------- Runner ----------
FROM node:18-alpine AS runner

WORKDIR /app

RUN corepack enable

COPY --from=builder /app ./

EXPOSE 8000
CMD ["yarn", "start"]