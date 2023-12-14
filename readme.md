# Node.js Express Project README

## Project Overview

This Node.js and Express project is designed to showcase best practices in code organization, emphasizing decoupling and JWT authentication. The implementation leverages technologies such as Prisma with Docker for efficient database management and testing.

## 📋 Table of Contents

[Prisma and Docker](#prisma-and-docker)
[Decoupling Code](#decoupling-code)
[Factory Pattern](#factory-pattern)
[Adapter Pattern](#adapter-pattern)
[JWT Authentication](#jwt-authentication)

## Prisma and Docker

### Prisma Overview

Prisma is a modern database toolkit that provides a type-safe and auto-generated query builder. It simplifies database interactions and ensures type safety during development.

### Docker

Docker is a platform for developing, shipping, and running applications in containers. In this project, Docker is utilized to encapsulate the Prisma environment, making it easy to manage dependencies and run tests consistently.

## Decoupling Code

Decoupling code is a crucial principle for maintainability and scalability. This project emphasizes a separation of concerns by establishing contracts between the application and server layers. Each layer, including controllers and use cases, operates independently, reducing dependencies and facilitating code maintenance.

## Factory Pattern

The Factory Pattern is employed in this project for the creation of controllers and use cases. This design pattern promotes flexibility and code reusability by centralizing the instantiation process. By using the Factory Pattern, we achieve cleaner and more modular code, making it easier to extend and maintain.

## Adapter Pattern

The Adapter Pattern is applied to integrate the application layer with the Express server. The routeAdapter function converts Express request and response objects into a format compatible with our application layer. This adaptation allows for seamless communication between layers, promoting code readability and maintainability.

```js
import { Request, Response } from 'express';
import { IController } from '../../application/interfaces/controller';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      accountId: request.metadata?.accountId,
    });

    response.status(statusCode).json(body);
  };
}
```

By utilizing the Adapter Pattern, we isolate the application layer from server-specific details, making it easier to switch or upgrade the underlying server framework.

## JWT Authentication

JWT (JSON Web Token) authentication is implemented to secure the application. JSON Web Tokens are utilized to verify the identity of users, enhancing security and allowing for stateless communication between the client and server.
