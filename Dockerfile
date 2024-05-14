FROM golang:alpine as builder
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN apk add --no-cache build-base openssl
RUN go mod download
COPY . .
RUN apk add --no-cache git && go build -o sui_overflow_hack . && apk del git

FROM alpine
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=builder /app/sui_overflow_hack .
CMD [ "./sui_overflow_hack" ]
