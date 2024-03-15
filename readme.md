# NestJS Forest Admin

<p align="center">
  <a href="https://forestadmin.com" target="blank"><img src="https://assets-global.website-files.com/609bc2f429b6d56efa4a2774/6426f673720545606ebc4c5d_fa-logo-default.svg"/></a>
</p>

### Introduction

Forest Admin is a low-code SaaS solution that auto-generates an admin panel on top of a data source.

### Installation

To start building with Forest Admin on NestJS, first install the required package

```bash
$ npm i --save nestjs-forest
```

#### Overview

Start by binding the ForestModule to your AppModule, and give it the configuration payload for the Agent, along with potential data sources to bind

```typescript
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ForestModule, createSqlDataSource } from 'nestjs-forest';

ForestModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        authSecret: configService.get<string>('FOREST_AUTH_SECRET'),
        envSecret: configService.get<string>('FOREST_ENV_SECRET'),
        isProduction: configService.get<string>('ENV') === 'production',
        datasources: [createSqlDataSource(configService.get<string>('DATABASE_URL'))],
    }),
})
```

There is an extra step required by the actual inner Forest Admin Agent implementation.

We have to bind the agent in the app.ts file

```typescript
import { NestFactory } from '@nestjs/core';
import { ForestService } from 'nestjs-forest';

import { AppModule } from './app.module';

const app = await NestFactory.create(AppModule, {});

// Other code...

const forestService = app.get(ForestService);
forestService.setApp(app);

// Other code...

await app.listen(3000, async () => {
    // Start call must be the very last one, to generate the schema file.
    await forestService.start();
});
```

#### Usage with dependency injection

Once everything is set up, you can access the ForestService in your own services

```typescript
import { Injectable } from '@nestjs/common';

import { ForestService } from 'nestjs-forest';

@Injectable()
export class AdminService {
    constructor(private readonly _forestService: ForestService) {
        this.customizeCollections();
    }

    customizeCollections = () => {
        this._forestService.agent.customizeCollection('companies', (collection) => {
            collection.addAction('Test', {
                scope: 'Single',
                execute: async (ctx, resultBuilder) => {
                    console.log('This is my test action');
                    return resultBuilder.success('Yes');
                },
            });
        });
    };
};
```