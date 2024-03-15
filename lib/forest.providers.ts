import { Provider } from '@nestjs/common';

import { ForestModuleOptions } from './forest.interfaces';
import { FOREST_TOKEN } from './forest.constants';
import { ForestService } from './forest.service';

export function createForestProviders(options: ForestModuleOptions): Provider {
    return {
        provide: FOREST_TOKEN,
        useValue: new ForestService(options),
    };
}
