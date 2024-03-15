import { Inject } from '@nestjs/common';

import { FOREST_MODULE_OPTIONS, FOREST_TOKEN } from './forest.constants';

const makeInjectableDecorator =
    (token: string | symbol): (() => ParameterDecorator) =>
    () =>
        Inject(token);

export const InjectForest = makeInjectableDecorator(FOREST_TOKEN);
export const InjectForestModuleConfig = makeInjectableDecorator(FOREST_MODULE_OPTIONS);
